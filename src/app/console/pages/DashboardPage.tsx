import { useNavigate } from "react-router";
import {
  Package,
  Building2,
  Newspaper,
  Handshake,
  Briefcase,
  Languages,
  ArrowRight,
  Pencil,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useDataStore, type Product, type Industry, type NewsItem, type Partner, type Job } from "@/app/store/dataStore";
import { useEffect } from "react";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  navigateTo: string;
}

function StatCard({ title, value, description, Icon, accentColor, navigateTo }: StatCardProps) {
  const navigate = useNavigate();
  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div
              className="inline-flex size-11 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
            >
              <Icon className="size-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
              <h3 className="text-3xl font-bold tracking-tight mt-1">{value}</h3>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">{description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            onClick={() => navigate(navigateTo)}
          >
            <Pencil className="size-4" />
            <span>编辑</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface RecentItem {
  id: string;
  title: string;
  module: string;
  navigateTo: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const hydrate = useDataStore((state) => state.hydrate);
  const products = useDataStore((state) => state.products) as Product[];
  const industries = useDataStore((state) => state.industries) as Industry[];
  const news = useDataStore((state) => state.news) as NewsItem[];
  const partners = useDataStore((state) => state.partners) as Partner[];
  const careers = useDataStore((state) => state.careers) as Job[];
  const i18n = useDataStore((state) => state.i18n);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const langCount = i18n ? Object.keys(i18n).length : 0;

  const recentEdits: RecentItem[] = [
    ...(products.slice(0, 2).map((p) => ({
      id: `prod-${p.id}`,
      title: p.name,
      module: "产品管理",
      navigateTo: "/console/products",
    })) as RecentItem[]),
    ...(industries.slice(0, 2).map((i) => ({
      id: `ind-${i.id}`,
      title: i.title?.zh ?? "行业方案",
      module: "行业方案",
      navigateTo: "/console/industries",
    })) as RecentItem[]),
    ...(news.slice(0, 2).map((n) => ({
      id: `news-${n.id}`,
      title: n.title?.zh ?? "新闻动态",
      module: "新闻动态",
      navigateTo: "/console/news",
    })) as RecentItem[]),
    ...(partners.slice(0, 1).map((p) => ({
      id: `part-${p.id}`,
      title: p.name,
      module: "合作伙伴",
      navigateTo: "/console/partners",
    })) as RecentItem[]),
    ...(careers.slice(0, 1).map((c) => ({
      id: `job-${c.id}`,
      title: c.title?.zh ?? "招聘职位",
      module: "招聘管理",
      navigateTo: "/console/careers",
    })) as RecentItem[]),
  ].slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">概览</h2>
        <p className="text-slate-500 dark:text-slate-400">
          欢迎回来，快速查看官网内容数据统计与最近编辑记录。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="产品数"
          value={products.length}
          description={`共 ${products.length} 个产品`}
          Icon={Package}
          accentColor="#C8102E"
          navigateTo="/console/products"
        />
        <StatCard
          title="行业方案"
          value={industries.length}
          description={`共 ${industries.length} 个方案`}
          Icon={Building2}
          accentColor="#1B7EC2"
          navigateTo="/console/industries"
        />
        <StatCard
          title="新闻动态"
          value={news.length}
          description={`共 ${news.length} 条资讯`}
          Icon={Newspaper}
          accentColor="#E8820C"
          navigateTo="/console/news"
        />
        <StatCard
          title="合作伙伴"
          value={partners.length}
          description={`共 ${partners.length} 家伙伴`}
          Icon={Handshake}
          accentColor="#2E6B9E"
          navigateTo="/console/partners"
        />
        <StatCard
          title="招聘职位"
          value={careers.length}
          description={`共 ${careers.length} 个职位`}
          Icon={Briefcase}
          accentColor="#4A86D9"
          navigateTo="/console/careers"
        />
        <StatCard
          title="语言数"
          value={langCount}
          description={`共 ${langCount} 种语言`}
          Icon={Languages}
          accentColor="#8B2FC8"
          navigateTo="/console/i18n"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="space-y-1">
              <CardTitle className="text-base">最近编辑</CardTitle>
              <CardDescription>以下是最近录入的内容记录，点击右侧按钮可快速跳转到对应模块。</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentEdits.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-400 dark:text-slate-500">
                  暂无最近编辑记录
                </div>
              ) : (
                recentEdits.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        <Clock className="size-4 text-slate-500 dark:text-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{item.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.module}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 gap-1"
                      onClick={() => navigate(item.navigateTo)}
                    >
                      <span>快速编辑</span>
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">快速操作</CardTitle>
            <CardDescription>快捷进入各管理模块</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {[
              { label: "产品管理", to: "/console/products", Icon: Package },
              { label: "行业方案", to: "/console/industries", Icon: Building2 },
              { label: "新闻动态", to: "/console/news", Icon: Newspaper },
              { label: "合作伙伴", to: "/console/partners", Icon: Handshake },
              { label: "招聘管理", to: "/console/careers", Icon: Briefcase },
              { label: "多语言文案", to: "/console/i18n", Icon: Languages },
            ].map(({ label, to, Icon }) => (
              <Button
                key={to}
                variant="ghost"
                className="w-full justify-start gap-2 h-10"
                onClick={() => navigate(to)}
              >
                <Icon className="size-4 text-slate-500" />
                <span>{label}</span>
                <ArrowRight className="size-3.5 ml-auto text-slate-400" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
