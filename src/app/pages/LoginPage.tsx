import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { useAuthStore } from "@/app/store/authStore";
import logoLight from "@/imports/logo-light.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const result = login(username.trim(), password);
      setLoading(false);

      if (result.success) {
        toast.success("登录成功", { description: "欢迎进入后台管理系统" });
        navigate("/console", { replace: true });
      } else {
        toast.error("登录失败", { description: result.message ?? "用户名或密码错误" });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="flex justify-center">
            <img src={logoLight} alt="DELESUN Logo" className="h-12 w-auto object-contain" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold tracking-tight">DELESUN 后台管理系统</CardTitle>
            <CardDescription>使用管理员账号登录以进入控制台</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                type="text"
                placeholder="请输入用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "登录中..." : "登 录"}
            </Button>
            <div className="text-center text-sm text-muted-foreground pt-2">
              默认账号：<span className="font-mono">admin</span> / <span className="font-mono">123456</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
