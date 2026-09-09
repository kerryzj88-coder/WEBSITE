import { NavLink, Outlet, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Package,
  Building2,
  Newspaper,
  Handshake,
  Briefcase,
  Languages,
  LogOut,
  User,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { useAuthStore } from "@/app/store/authStore";
import { toast } from "sonner";

const menuItems = [
  { to: "/console", label: "Dashboard", Icon: LayoutDashboard, end: true },
  { to: "/console/products", label: "产品管理", Icon: Package },
  { to: "/console/industries", label: "行业方案", Icon: Building2 },
  { to: "/console/news", label: "新闻动态", Icon: Newspaper },
  { to: "/console/partners", label: "合作伙伴", Icon: Handshake },
  { to: "/console/careers", label: "招聘管理", Icon: Briefcase },
  { to: "/console/i18n", label: "多语言文案", Icon: Languages },
];

export default function ConsoleLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    toast.success("已退出登录");
    navigate("/auth/login", { replace: true });
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950">
        <aside className="hidden md:flex w-64 flex-col border-r bg-white dark:bg-slate-900 dark:border-slate-800">
          <div className="h-16 flex items-center px-6 border-b dark:border-slate-800">
            <span className="font-bold text-lg tracking-tight">DELESUN 控制台</span>
          </div>
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {menuItems.map(({ to, label, Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  )
                }
              >
                <Icon className="size-4 shrink-0" />
                <span className="flex-1">{label}</span>
                <ChevronRight className="size-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </NavLink>
            ))}
          </nav>
          <div className="p-3 border-t dark:border-slate-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50 dark:text-slate-300 dark:hover:bg-red-950/40 dark:hover:text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
              <span>退出登录</span>
            </Button>
          </div>
        </aside>

        <aside className="md:hidden w-16 flex-col border-r bg-white dark:bg-slate-900 dark:border-slate-800">
          <div className="h-16 flex items-center justify-center border-b dark:border-slate-800">
            <span className="font-bold text-sm">DS</span>
          </div>
          <nav className="flex-1 overflow-y-auto p-2 space-y-1">
            {menuItems.map(({ to, label, Icon, end }) => (
              <Tooltip key={to}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-center rounded-lg size-10 transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      )
                    }
                  >
                    <Icon className="size-4" />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>
          <div className="p-2 border-t dark:border-slate-800">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full text-slate-600 hover:text-red-600 hover:bg-red-50 dark:text-slate-300 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">退出登录</TooltipContent>
            </Tooltip>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-white dark:bg-slate-900 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span>后台管理</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <User className="size-4 text-slate-600 dark:text-slate-300" />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-medium leading-none">{user?.username ?? "admin"}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">管理员</span>
                </div>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-red-600 hover:bg-red-50 dark:text-slate-300 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">退出</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
