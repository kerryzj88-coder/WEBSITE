import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/app/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";

import { useIndustries, queryKeys } from "@/app/lib/api";
import { useDataStore, type Industry, type IndustryDetail } from "@/app/store/dataStore";

const ICON_OPTIONS = [
  "Flame",
  "Thermometer",
  "Zap",
  "Layers",
  "Shield",
  "Droplets",
  "Wind",
  "Gauge",
  "Award",
  "Atom",
  "Cpu",
  "Bot",
  "Rocket",
  "Building2",
  "Factory",
  "Car",
  "Train",
  "Plane",
];

type LangKey = "zh" | "en" | "es" | "fr";

interface IndustryFormState {
  title: Record<LangKey, string>;
  desc: Record<LangKey, string>;
  detail: Record<LangKey, IndustryDetail>;
  icon: string;
  img: string;
  weight: number;
}

const emptyDetail = (): IndustryDetail => ({
  challenge: "",
  solution: "",
  cases: "",
  products: "",
});

const emptyForm = (): IndustryFormState => ({
  title: { zh: "", en: "", es: "", fr: "" },
  desc: { zh: "", en: "", es: "", fr: "" },
  detail: {
    zh: emptyDetail(),
    en: emptyDetail(),
    es: emptyDetail(),
    fr: emptyDetail(),
  },
  icon: "Zap",
  img: "",
  weight: 0,
});

const industryToForm = (i: Industry & { weight?: number }): IndustryFormState => ({
  title: { ...i.title },
  desc: { ...i.desc },
  detail: {
    zh: { ...i.detail.zh },
    en: { ...i.detail.en },
    es: { ...i.detail.es },
    fr: { ...i.detail.fr },
  },
  icon: i.icon,
  img: i.img,
  weight: (i as any).weight ?? 0,
});

const formToPayload = (f: IndustryFormState): Partial<Industry> => ({
  title: { ...f.title },
  desc: { ...f.desc },
  detail: {
    zh: { ...f.detail.zh },
    en: { ...f.detail.en },
    es: { ...f.detail.es },
    fr: { ...f.detail.fr },
  },
  icon: f.icon,
  img: f.img,
  weight: f.weight,
} as any);

export function IndustriesPage() {
  const { data: industries = [] } = useIndustries();
  const queryClient = useQueryClient();
  const dataStore = useDataStore();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Industry | null>(null);
  const [form, setForm] = useState<IndustryFormState>(emptyForm());

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Industry | null>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (i: Industry) => {
    setEditing(i);
    setForm(industryToForm(i));
    setDialogOpen(true);
  };

  const requestDelete = (i: Industry) => {
    setDeleteTarget(i);
    setDeleteOpen(true);
  };

  const handleSubmit = () => {
    const payload = formToPayload(form);
    if (editing) {
      dataStore.update("industries", editing.id, payload);
    } else {
      dataStore.add("industries", payload);
    }
    queryClient.invalidateQueries({ queryKey: queryKeys.industries });
    setDialogOpen(false);
    toast("保存成功");
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      dataStore.remove("industries", deleteTarget.id);
      queryClient.invalidateQueries({ queryKey: queryKeys.industries });
      setDeleteOpen(false);
      setDeleteTarget(null);
      toast("删除成功");
    }
  };

  const updateField = <K extends keyof IndustryFormState>(
    key: K,
    value: IndustryFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateLangField = <K extends "title" | "desc">(
    key: K,
    lang: LangKey,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: { ...(prev[key] as Record<LangKey, string>), [lang]: value },
    }));
  };

  const updateDetailField = (
    lang: LangKey,
    field: keyof IndustryDetail,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      detail: {
        ...prev.detail,
        [lang]: { ...prev.detail[lang], [field]: value },
      },
    }));
  };

  const sortedIndustries = [...industries].sort((a, b) => {
    const wa = (a as any).weight ?? 0;
    const wb = (b as any).weight ?? 0;
    return wa - wb;
  });

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">行业方案</h1>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" />
          新增行业
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题 (中文)</TableHead>
              <TableHead>标题 (English)</TableHead>
              <TableHead>权重</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedIndustries.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="font-medium">{i.title.zh}</TableCell>
                <TableCell>{i.title.en}</TableCell>
                <TableCell>{(i as any).weight ?? 0}</TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(i)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => requestDelete(i)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {sortedIndustries.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  暂无数据，点击右上角新增行业方案
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "编辑行业方案" : "新增行业方案"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>图标</Label>
                <Select value={form.icon} onValueChange={(v) => updateField("icon", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((ic) => (
                      <SelectItem key={ic} value={ic}>
                        {ic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>图片 URL</Label>
                <Input
                  value={form.img}
                  onChange={(e) => updateField("img", e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>排序权重（数字越小越靠前）</Label>
                <Input
                  type="number"
                  value={form.weight}
                  onChange={(e) => updateField("weight", Number(e.target.value) || 0)}
                />
              </div>
            </div>

            <Tabs defaultValue="zh" className="w-full">
              <TabsList>
                <TabsTrigger value="zh">ZH</TabsTrigger>
                <TabsTrigger value="en">EN</TabsTrigger>
                <TabsTrigger value="es">ES</TabsTrigger>
                <TabsTrigger value="fr">FR</TabsTrigger>
              </TabsList>

              {(["zh", "en", "es", "fr"] as LangKey[]).map((lang) => (
                <TabsContent key={lang} value={lang} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>标题</Label>
                    <Input
                      value={form.title[lang]}
                      onChange={(e) => updateLangField("title", lang, e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>简介</Label>
                    <Textarea
                      value={form.desc[lang]}
                      onChange={(e) => updateLangField("desc", lang, e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>行业挑战 (Challenge)</Label>
                    <Textarea
                      value={form.detail[lang].challenge}
                      onChange={(e) => updateDetailField(lang, "challenge", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>解决方案 (Solution)</Label>
                    <Textarea
                      value={form.detail[lang].solution}
                      onChange={(e) => updateDetailField(lang, "solution", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>应用案例 (Cases)</Label>
                    <Textarea
                      value={form.detail[lang].cases}
                      onChange={(e) => updateDetailField(lang, "cases", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>相关产品 (Products)</Label>
                    <Textarea
                      value={form.detail[lang].products}
                      onChange={(e) => updateDetailField(lang, "products", e.target.value)}
                      rows={3}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除行业方案 &quot;{deleteTarget?.title.zh}&quot; 吗？此操作不可恢复。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default IndustriesPage;
