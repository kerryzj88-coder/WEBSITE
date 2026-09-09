import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import App from "../App";
import LoginPage from "./LoginPage";
import ConsoleLayout from "../console/ConsoleLayout";
import DashboardPage from "../console/pages/DashboardPage";
import ProductsPage from "../console/pages/ProductsPage";
import IndustriesPage from "../console/pages/IndustriesPage";
import NewsPage from "../console/pages/NewsPage";
import PartnersPage from "../console/pages/PartnersPage";
import CareersPage from "../console/pages/CareersPage";
import I18nPage from "../console/pages/I18nPage";
import { useAuthStore } from "../store/authStore";
import { Toaster } from "../components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function RequireAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/console" element={<RequireAuth />}>
            <Route element={<ConsoleLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="industries" element={<IndustriesPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="partners" element={<PartnersPage />} />
              <Route path="careers" element={<CareersPage />} />
              <Route path="i18n" element={<I18nPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}
