import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { selectAll as dbSelectAll, getI18n as dbGetI18n, seedIfNeeded } from "../mock/db";
import type { Product, Industry, NewsItem, Partner, Job, TranslationsShape } from "../mock/seed";
import type { CollectionName } from "../mock/db";

export type { Product, Industry, NewsItem, Partner, Job, TranslationsShape };

const STALE_TIME = 5 * 60 * 1000;

const ensureSeed = (): void => {
  seedIfNeeded();
};

export const getProducts = (): Product[] => {
  ensureSeed();
  return (dbSelectAll("products") as Product[]) ?? [];
};

export const getIndustries = (): Industry[] => {
  ensureSeed();
  return (dbSelectAll("industries") as Industry[]) ?? [];
};

export const getNews = (): NewsItem[] => {
  ensureSeed();
  return (dbSelectAll("news") as NewsItem[]) ?? [];
};

export const getPartners = (): Partner[] => {
  ensureSeed();
  return (dbSelectAll("partners") as Partner[]) ?? [];
};

export const getCareers = (): Job[] => {
  ensureSeed();
  return (dbSelectAll("careers") as Job[]) ?? [];
};

export const getI18n = (): TranslationsShape => {
  ensureSeed();
  return dbGetI18n();
};

export const getCollection = <C extends CollectionName>(
  collection: C
): C extends "i18n" ? TranslationsShape : any[] => {
  ensureSeed();
  if (collection === "i18n") return dbGetI18n() as any;
  return (dbSelectAll(collection) ?? []) as any;
};

const queryFactory = <T>(
  queryKey: string[],
  fetcher: () => T,
  _collection: CollectionName | null
) => ({
  queryKey,
  queryFn: () => {
    seedIfNeeded();
    return fetcher();
  },
  staleTime: STALE_TIME,
  gcTime: STALE_TIME * 2,
  refetchOnMount: true,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});

export const useProducts = (): UseQueryResult<Product[], Error> => {
  return useQuery(
    queryFactory(["products"], getProducts, "products") as any
  );
};

export const useIndustries = (): UseQueryResult<Industry[], Error> => {
  return useQuery(
    queryFactory(["industries"], getIndustries, "industries") as any
  );
};

export const useNews = (): UseQueryResult<NewsItem[], Error> => {
  return useQuery(
    queryFactory(["news"], getNews, "news") as any
  );
};

export const usePartners = (): UseQueryResult<Partner[], Error> => {
  return useQuery(
    queryFactory(["partners"], getPartners, "partners") as any
  );
};

export const useCareers = (): UseQueryResult<Job[], Error> => {
  return useQuery(
    queryFactory(["careers"], getCareers, "careers") as any
  );
};

export const useI18n = (): UseQueryResult<TranslationsShape, Error> => {
  return useQuery(
    queryFactory(["i18n"], getI18n, "i18n") as any
  );
};

export const useCollection = <C extends CollectionName>(
  collection: C
): UseQueryResult<any, Error> => {
  const map: Record<CollectionName, () => any> = {
    products: getProducts,
    industries: getIndustries,
    news: getNews,
    partners: getPartners,
    careers: getCareers,
    i18n: getI18n,
  };
  return useQuery(
    queryFactory([collection], map[collection], collection) as any
  );
};

export const queryKeys = {
  products: ["products"],
  industries: ["industries"],
  news: ["news"],
  partners: ["partners"],
  careers: ["careers"],
  i18n: ["i18n"],
  all: ["products", "industries", "news", "partners", "careers", "i18n"],
};
