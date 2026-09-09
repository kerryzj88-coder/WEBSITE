import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
  DialogTrigger,
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
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { usePartners, queryKeys } from "../../lib/api";
import { useDataStore } from "../../store/dataStore";
import type { Partner as BasePartner } from "../../lib/api";
import { MultiLangField, type LangValueMap } from "../components/MultiLangField";

interface PartnerExt extends BasePartner {
  sort?: number;
  website?: string;
  nameZh?: string;
  nameEn?: string;
  nameEs?: string;
  nameFr?: string;
}

const emptyNames = (): LangValueMap => ({ zh: "", en: "", es: "", fr: "" });

function partnerNames(p: PartnerExt): LangValueMap {
  return {
    zh: p.nameZh ?? p.name ?? "",
    en: p.nameEn ?? p.name ?? "",
    es: p.nameEs ?? p.name ?? "",
    fr: p.nameFr ?? p.name ?? "",
  };
}

interface FormState {
  names: LangValueMap;
  logo: string;
  sort: number;
  website: string;
}

const emptyForm = (): FormState => ({
  names: emptyNames(),
  logo: "",
  sort: 0,
  website: "",
});

export default function PartnersPage() {
  const queryClient = useQueryClient();
  const { data: partners = [] } = usePartners();
  const { add, update, remove } = useDataStore();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (p: PartnerExt) => {
    setEditingId(p.id);
    setForm({
      names: partnerNames(p),
      logo: p.logo ?? "",
      sort: p.sort ?? 0,
      website: p.website ?? "",
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const nameZh = form.names.zh.trim() || form.names.en.trim();
    if (!nameZh || !form.logo.trim()) {
      toast.error("请填写名称和Logo URL");
      return;
    }
    const payload = {
      name: nameZh,
      nameZh: form.names.zh,
      nameEn: form.names.en,
      nameEs: form.names.es,
      nameFr: form.names.fr,
      logo: form.logo.trim(),
      sort: form.sort ?? 0,
      website: form.website.trim(),
    };
    if (editingId) {
      update("partners", editingId, payload);
    } else {
      add("partners", payload);
    }
    queryClient.invalidateQueries({ queryKey: queryKeys.partners });
    setDialogOpen(false);
    toast.success(editingId ? "保存成功" : "新增成功");
  };

  const handleDelete = () => {
    if (!deleteId) return;
    remove("partners", deleteId);
    queryClient.invalidateQueries({ queryKey: queryKeys.partners });
    setDeleteId(null);
    toast.success("删除成功");
  };

  const list = [...(partners as PartnerExt[])].sort(
    (a, b) => (a.sort ?? 0) - (b.sort ?? 0)
  );

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">合作伙伴管理</h1>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 mr-2" />
          新增合作伙伴
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Logo</TableHead>
            <TableHead>名称</TableHead>
            <TableHead className="w-24">排序</TableHead>
            <TableHead className="w-32 text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                暂无数据，点击右上角新增
              </TableCell>
            </TableRow>
          ) : (
            list.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <ImageWithFallback
                    src={p.logo}
                    alt={p.name}
                    className="h-10 w-auto"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div>{p.nameZh || p.name}</div>
                  {(p.nameEn || p.nameEs || p.nameFr) && (
                    <div className="text-xs text-muted-foreground">
                      {p.nameEn && <span className="mr-2">{p.nameEn}</span>}
                      {p.nameEs && <span className="mr-2">{p.nameEs}</span>}
                      {p.nameFr && <span>{p.nameFr}</span>}
                    </div>
                  )}
                </TableCell>
                <TableCell>{p.sort ?? 0}</TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(p)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <AlertDialog
                      open={deleteId === p.id}
                      onOpenChange={(open) => !open && setDeleteId(null)}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(p.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除？</AlertDialogTitle>
                          <AlertDialogDescription>
                            删除后将无法恢复，确定要删除该合作伙伴吗？
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setDeleteId(null)}>
                            取消
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            删除
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "编辑合作伙伴" : "新增合作伙伴"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <MultiLangField
              fieldKey="名称"
              valueMap={form.names}
              onChange={(v) => setForm({ ...form, names: v })}
            />
            <div className="space-y-2">
              <Label htmlFor="partner-logo">Logo URL</Label>
              <Input
                id="partner-logo"
                placeholder="https://..."
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
              />
              {form.logo && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">预览：</p>
                  <div className="inline-block p-2 border rounded-md bg-muted/30">
                    <ImageWithFallback
                      src={form.logo}
                      alt="logo preview"
                      className="h-10 w-auto"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partner-sort">排序</Label>
                <Input
                  id="partner-sort"
                  type="number"
                  value={form.sort}
                  onChange={(e) =>
                    setForm({ ...form, sort: Number(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partner-website">官网链接</Label>
                <Input
                  id="partner-website"
                  placeholder="https://..."
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "保存" : "新增"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
