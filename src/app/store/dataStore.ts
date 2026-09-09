import { create } from "zustand";
import {
  selectAll as dbSelectAll,
  addItem as dbAddItem,
  updateItem as dbUpdateItem,
  removeItem as dbRemoveItem,
  getI18n as dbGetI18n,
  updateI18n as dbUpdateI18n,
  subscribeDB,
  seedIfNeeded,
  resetDB as dbResetDB,
} from "../mock/db";
import type { Product, Industry, NewsItem, Partner, Job, TranslationsShape } from "../mock/seed";
import type { CollectionName } from "../mock/db";

export type { Product, Industry, NewsItem, Partner, Job, TranslationsShape };

export interface DataState {
  products: Product[];
  industries: Industry[];
  news: NewsItem[];
  partners: Partner[];
  careers: Job[];
  i18n: TranslationsShape;

  isHydrated: boolean;
  lastChanged: CollectionName | null;

  hydrate: () => void;
  refresh: (collection?: CollectionName | null) => void;

  selectAll: <C extends CollectionName>(collection: C) =>
    C extends "i18n" ? TranslationsShape :
    C extends "products" ? Product[] :
    C extends "industries" ? Industry[] :
    C extends "news" ? NewsItem[] :
    C extends "partners" ? Partner[] :
    Job[];

  add: <C extends CollectionName>(collection: C, item: any) => any;
  update: <C extends CollectionName>(collection: C, id: string, patch: any) => any;
  remove: <C extends CollectionName>(collection: C, id: string) => boolean;
  updateTranslations: (data: TranslationsShape) => TranslationsShape;
  resetAll: () => void;
}

const readCollection = <C extends CollectionName>(collection: C): any => {
  if (collection === "i18n") return dbGetI18n();
  return dbSelectAll(collection) ?? [];
};

let subscribed = false;

export const useDataStore = create<DataState>((set, get) => ({
  products: [],
  industries: [],
  news: [],
  partners: [],
  careers: [],
  i18n: { zh: {}, en: {}, es: {}, fr: {} },

  isHydrated: false,
  lastChanged: null,

  hydrate: () => {
    seedIfNeeded();
    set({
      products: readCollection("products"),
      industries: readCollection("industries"),
      news: readCollection("news"),
      partners: readCollection("partners"),
      careers: readCollection("careers"),
      i18n: readCollection("i18n"),
      isHydrated: true,
    });

    if (!subscribed && typeof window !== "undefined") {
      subscribed = true;
      subscribeDB((collection) => {
        get().refresh(collection);
      });
    }
  },

  refresh: (collection) => {
    if (!collection) {
      set({
        products: readCollection("products"),
        industries: readCollection("industries"),
        news: readCollection("news"),
        partners: readCollection("partners"),
        careers: readCollection("careers"),
        i18n: readCollection("i18n"),
        lastChanged: null,
      });
      return;
    }
    const value = readCollection(collection);
    if (collection === "i18n") {
      set({ i18n: value, lastChanged: collection });
    } else {
      set({ [collection]: value, lastChanged: collection } as any);
    }
  },

  selectAll: (collection) => {
    if (!get().isHydrated) get().hydrate();
    if (collection === "i18n") return get().i18n as any;
    return (get() as any)[collection] as any;
  },

  add: (collection, item) => {
    const result = dbAddItem(collection, item);
    return result;
  },

  update: (collection, id, patch) => {
    const result = dbUpdateItem(collection, id, patch);
    return result;
  },

  remove: (collection, id) => {
    return dbRemoveItem(collection, id);
  },

  updateTranslations: (data) => {
    return dbUpdateI18n(data);
  },

  resetAll: () => {
    dbResetDB();
  },
}));

if (typeof window !== "undefined") {
  useDataStore.getState().hydrate();
}
