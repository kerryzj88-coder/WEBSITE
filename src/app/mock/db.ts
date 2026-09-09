import { seedData } from "./seed";
import type { Product, Industry, NewsItem, Partner, Job, TranslationsShape } from "./seed";

export type CollectionName = "products" | "industries" | "news" | "partners" | "careers" | "i18n";

export type CollectionTypeMap = {
  products: Product;
  industries: Industry;
  news: NewsItem;
  partners: Partner;
  careers: Job;
  i18n: TranslationsShape;
};

const DB_PREFIX = "delesun_db_";
export const SEED_VERSION = 2;
const SEED_VERSION_KEY = "delesun_db_seed_version";
const COLLECTIONS: CollectionName[] = ["products", "industries", "news", "partners", "careers", "i18n"];

const storageKey = (collection: CollectionName): string => `${DB_PREFIX}${collection}`;

const isBrowser = (): boolean => typeof window !== "undefined" && typeof localStorage !== "undefined";

const readCollectionRaw = <T>(collection: CollectionName): T | null => {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(storageKey(collection));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const writeCollectionRaw = <T>(collection: CollectionName, data: T): void => {
  if (!isBrowser()) return;
  localStorage.setItem(storageKey(collection), JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("delesun-db-change", { detail: { collection } }));
};

export const isSeeded = (): boolean => {
  if (!isBrowser()) return false;
  return localStorage.getItem(SEED_VERSION_KEY) === String(SEED_VERSION);
};

export const markSeeded = (): void => {
  if (!isBrowser()) return;
  localStorage.setItem(SEED_VERSION_KEY, String(SEED_VERSION));
};

export const resetDB = (): void => {
  if (!isBrowser()) return;
  COLLECTIONS.forEach((c) => localStorage.removeItem(storageKey(c)));
  localStorage.removeItem(SEED_VERSION_KEY);
  window.dispatchEvent(new CustomEvent("delesun-db-change", { detail: { collection: null } }));
};

export const seedIfNeeded = (): boolean => {
  if (!isBrowser()) return false;
  const currentVersion = localStorage.getItem(SEED_VERSION_KEY);
  if (currentVersion === String(SEED_VERSION)) return false;
  COLLECTIONS.forEach((c) => localStorage.removeItem(storageKey(c)));
  writeCollectionRaw("products", seedData.products);
  writeCollectionRaw("industries", seedData.industries);
  writeCollectionRaw("news", seedData.news);
  writeCollectionRaw("partners", seedData.partners);
  writeCollectionRaw("careers", seedData.careers);
  writeCollectionRaw("i18n", seedData.i18n);
  markSeeded();
  return true;
};

export const selectAll = <C extends CollectionName>(collection: C): CollectionTypeMap[C][] | TranslationsShape | null => {
  seedIfNeeded();
  return readCollectionRaw<CollectionTypeMap[C][] | TranslationsShape>(collection);
};

export const selectById = <C extends CollectionName>(
  collection: C,
  id: string
): CollectionTypeMap[C] | null => {
  if (collection === "i18n") return null;
  const all = selectAll(collection) as CollectionTypeMap[C][] | null;
  if (!all) return null;
  return all.find((item) => (item as any).id === id) ?? null;
};

export const addItem = <C extends CollectionName>(
  collection: C,
  item: C extends "i18n" ? TranslationsShape : CollectionTypeMap[C]
): C extends "i18n" ? TranslationsShape : CollectionTypeMap[C] => {
  if (collection === "i18n") {
    writeCollectionRaw("i18n", item as TranslationsShape);
    return item as any;
  }
  const all = (selectAll(collection) as CollectionTypeMap[C][]) ?? [];
  const withId = { ...(item as any), id: (item as any).id ?? `${collection}-${Date.now()}` } as CollectionTypeMap[C];
  const next = [...all, withId];
  writeCollectionRaw(collection, next);
  return withId as any;
};

export const updateItem = <C extends CollectionName>(
  collection: C,
  id: string,
  patch: Partial<CollectionTypeMap[C]>
): CollectionTypeMap[C] | null => {
  if (collection === "i18n") return null;
  const all = (selectAll(collection) as CollectionTypeMap[C][]) ?? [];
  const idx = all.findIndex((item) => (item as any).id === id);
  if (idx === -1) return null;
  const updated = { ...all[idx], ...patch } as CollectionTypeMap[C];
  const next = [...all.slice(0, idx), updated, ...all.slice(idx + 1)];
  writeCollectionRaw(collection, next);
  return updated;
};

export const removeItem = <C extends CollectionName>(collection: C, id: string): boolean => {
  if (collection === "i18n") return false;
  const all = (selectAll(collection) as CollectionTypeMap[C][]) ?? [];
  const idx = all.findIndex((item) => (item as any).id === id);
  if (idx === -1) return false;
  const next = [...all.slice(0, idx), ...all.slice(idx + 1)];
  writeCollectionRaw(collection, next);
  return true;
};

export const updateI18n = (data: TranslationsShape): TranslationsShape => {
  writeCollectionRaw("i18n", data);
  return data;
};

export const getI18n = (): TranslationsShape => {
  seedIfNeeded();
  const stored = readCollectionRaw<TranslationsShape>("i18n");
  return stored ?? seedData.i18n;
};

export const subscribeDB = (handler: (collection: CollectionName | null) => void): (() => void) => {
  if (!isBrowser()) return () => {};
  const listener = (e: Event) => {
    const ce = e as CustomEvent<{ collection: CollectionName | null }>;
    handler(ce.detail?.collection ?? null);
  };
  const storageListener = (e: StorageEvent) => {
    if (e.key?.startsWith(DB_PREFIX)) {
      const name = e.key.replace(DB_PREFIX, "") as CollectionName;
      handler(COLLECTIONS.includes(name) ? name : null);
    } else if (e.key === SEED_VERSION_KEY) {
      handler(null);
    }
  };
  window.addEventListener("delesun-db-change", listener as EventListener);
  window.addEventListener("storage", storageListener);
  return () => {
    window.removeEventListener("delesun-db-change", listener as EventListener);
    window.removeEventListener("storage", storageListener);
  };
};
