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

import { useProducts, queryKeys } from "@/app/lib/api";
import { useDataStore, type Product, type ProductCategory } from "@/app/store/dataStore";

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
];

const CAT_OPTIONS: ProductCategory[] = ["heat", "thermal", "special"];
const CAT_LABELS: Record<ProductCategory, string> = {
  heat: "耐热阻燃",
  thermal: "导热隔热",
  special: "特种功能",
};

type LangKey = "zh" | "en" | "es" | "fr";

interface ProductFormState {
  name: Record<LangKey, string>;
  spec: Record<LangKey, string>;
  apps: Record<LangKey, string>;
  desc: Record<LangKey, string>;
  temp: Record<LangKey, string>;
  cat: ProductCategory;
  icon: string;
  color: string;
}

const emptyForm = (): ProductFormState => ({
  name: { zh: "", en: "", es: "", fr: "" },
  spec: { zh: "", en: "", es: "", fr: "" },
  apps: { zh: "", en: "", es: "", fr: "" },
  desc: { zh: "", en: "", es: "", fr: "" },
  temp: { zh: "", en: "", es: "", fr: "" },
  cat: "heat",
  icon: "Flame",
  color: "#C8102E",
});

const productToForm = (p: Product): ProductFormState => ({
  name: { zh: p.name, en: p.nameEn, es: p.nameEs, fr: p.nameFr },
  spec: { zh: p.spec, en: p.specEn, es: p.specEs, fr: p.specFr },
  apps: {
    zh: (p.apps || []).join(", "),
    en: (p.appsEn || []).join(", "),
    es: (p.appsEs || []).join(", "),
    fr: (p.appsFr || []).join(", "),
  },
  desc: { zh: p.desc, en: p.descEn, es: p.descEs, fr: p.descFr },
  temp: {
    zh: p.temp || "",
    en: p.tempEn || "",
    es: p.tempEs || "",
    fr: p.tempFr || "",
  },
  cat: p.cat,
  icon: p.icon,
  color: p.color,
});

const formToPayload = (f: ProductFormState): Partial<Product> => ({
  name: f.name.zh,
  nameEn: f.name.en,
  nameEs: f.name.es,
  nameFr: f.name.fr,
  spec: f.spec.zh,
  specEn: f.spec.en,
  specEs: f.spec.es,
  specFr: f.spec.fr,
  desc: f.desc.zh,
  descEn: f.desc.en,
  descEs: f.desc.es,
  descFr: f.desc.fr,
  temp: f.temp.zh,
  tempEn: f.temp.en,
  tempEs: f.temp.es,
  tempFr: f.temp.fr,
  apps: f.apps.zh.split(",").map((s) => s.trim()).filter(Boolean),
  appsEn: f.apps.en.split(",").map((s) => s.trim()).filter(Boolean),
  appsEs: f.apps.es.split(",").map((s) => s.trim()).filter(Boolean),
  appsFr: f.apps.fr.split(",").map((s) => s.trim()).filter(Boolean),
  cat: f.cat,
  icon: f.icon,
  color: f.color,
});

export function ProductsPage() {
  const { data: products = [] } = useProducts();
  const queryClient = useQueryClient();
  const dataStore = useDataStore();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm());

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm(productToForm(p));
    setDialogOpen(true);
  };

  const requestDelete = (p: Product) => {
    setDeleteTarget(p);
    setDeleteOpen(true);
  };

  const handleSubmit = () => {
    const payload = formToPayload(form);
    if (editing) {
      dataStore.update("products", editing.id, payload);
    } else {
      dataStore.add("products", payload);
    }
    queryClient.invalidateQueries({ queryKey: queryKeys.products });
    setDialogOpen(false);
    toast("保存成功");
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      dataStore.remove("products", deleteTarget.id);
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
      setDeleteOpen(false);
      setDeleteTarget(null);
      toast("删除成功");
    }
  };

  const updateField = <K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateLangField = <K extends "name" | "spec" | "apps" | "desc" | "temp">(
    key: K,
    lang: LangKey,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: { ...(prev[key] as Record<LangKey, string>), [lang]: value },
    }));
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">产品管理</h1>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" />
          新增产品
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名称 (中文)</TableHead>
              <TableHead>名称 (English)</TableHead>
              <TableHead>分类</TableHead>
              <TableHead>温度范围</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.nameEn}</TableCell>
                <TableCell>{CAT_LABELS[p.cat]}</TableCell>
                <TableCell>{p.temp}</TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(p)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => requestDelete(p)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  暂无数据，点击右上角新增产品
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "编辑产品" : "新增产品"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>分类</Label>
                <Select
                  value={form.cat}
                  onValueChange={(v) => updateField("cat", v as ProductCategory)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CAT_OPTIONS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {CAT_LABELS[c]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>图标</Label>
                <Select value={form.icon} onValueChange={(v) => updateField("icon", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>颜色</Label>
                <Input
                  type="color"
                  value={form.color}
                  onChange={(e) => updateField("color", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>温度范围 (中文)</Label>
                <Input
                  value={form.temp.zh}
                  onChange={(e) => updateLangField("temp", "zh", e.target.value)}
                  placeholder="-55°C ~ +250°C"
                />
              </div>
              <div className="space-y-2">
                <Label>Temperature (EN)</Label>
                <Input
                  value={form.temp.en}
                  onChange={(e) => updateLangField("temp", "en", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Temperatura (ES)</Label>
                <Input
                  value={form.temp.es}
                  onChange={(e) => updateLangField("temp", "es", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Température (FR)</Label>
                <Input
                  value={form.temp.fr}
                  onChange={(e) => updateLangField("temp", "fr", e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="zh" className="w-full">
              <TabsList>
                <TabsTrigger value="zh">中文</TabsTrigger>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="es">Español</TabsTrigger>
                <TabsTrigger value="fr">Français</TabsTrigger>
              </TabsList>

              {(["zh", "en", "es", "fr"] as LangKey[]).map((lang) => (
                <TabsContent key={lang} value={lang} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>名称</Label>
                    <Input
                      value={form.name[lang]}
                      onChange={(e) => updateLangField("name", lang, e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>规格参数</Label>
                    <Input
                      value={form.spec[lang]}
                      onChange={(e) => updateLangField("spec", lang, e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>应用领域（逗号分隔）</Label>
                    <Input
                      value={form.apps[lang]}
                      onChange={(e) => updateLangField("apps", lang, e.target.value)}
                      placeholder="储能, 新能源汽车, 电池"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>产品描述</Label>
                    <Textarea
                      value={form.desc[lang]}
                      onChange={(e) => updateLangField("desc", lang, e.target.value)}
                      rows={4}
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
              确定要删除产品 &quot;{deleteTarget?.name}&quot; 吗？此操作不可恢复。
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

export default ProductsPage;
