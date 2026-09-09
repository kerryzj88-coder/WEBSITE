import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Flame } from "lucide-react";
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
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Badge } from "@/app/components/ui/badge";
import { useCareers, queryKeys, type Job as BaseJob } from "../../lib/api";
import { useDataStore } from "../../store/dataStore";
import type { Lang } from "../../lib/api";
import { MultiLangField, type LangValueMap } from "../components/MultiLangField";

interface JobExt extends BaseJob {
  description?: Record<Lang, string>;
  salary?: string;
  isHot?: boolean;
  publishDate?: string;
}

const emptyRecord = (): LangValueMap => ({ zh: "", en: "", es: "", fr: "" });

interface FormState {
  title: LangValueMap;
  dept: LangValueMap;
  location: LangValueMap;
  type: LangValueMap;
  description: LangValueMap;
  salary: string;
  isHot: boolean;
  publishDate: string;
}

const emptyForm = (): FormState => ({
  title: emptyRecord(),
  dept: emptyRecord(),
  location: emptyRecord(),
  type: emptyRecord(),
  description: emptyRecord(),
  salary: "",
  isHot: false,
  publishDate: "",
});

function jobToForm(j: JobExt): FormState {
  return {
    title: { ...emptyRecord(), ...(j.title ?? {}) },
    dept: { ...emptyRecord(), ...(j.dept ?? {}) },
    location: { ...emptyRecord(), ...(j.location ?? {}) },
    type: { ...emptyRecord(), ...(j.type ?? {}) },
    description: { ...emptyRecord(), ...(j.description ?? {}) },
    salary: j.salary ?? "",
    isHot: j.isHot ?? false,
    publishDate: j.publishDate ?? "",
  };
}

function formToJob(f: FormState): {
  title: Record<Lang, string>;
  dept: Record<Lang, string>;
  location: Record<Lang, string>;
  type: Record<Lang, string>;
  description: Record<Lang, string>;
  salary: string;
  isHot: boolean;
  publishDate: string;
} {
  return {
    title: f.title as Record<Lang, string>,
    dept: f.dept as Record<Lang, string>,
    location: f.location as Record<Lang, string>,
    type: f.type as Record<Lang, string>,
    description: f.description as Record<Lang, string>,
    salary: f.salary,
    isHot: f.isHot,
    publishDate: f.publishDate,
  };
}

export default function CareersPage() {
  const queryClient = useQueryClient();
  const { data: careers = [] } = useCareers();
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

  const openEdit = (j: JobExt) => {
    setEditingId(j.id);
    setForm(jobToForm(j));
    setDialogOpen(true);
  };

  const handleSave = () => {
    const hasTitle =
      form.title.zh.trim() ||
      form.title.en.trim() ||
      form.title.es.trim() ||
      form.title.fr.trim();
    if (!hasTitle) {
      toast.error("请至少填写一个语言的职位名称");
      return;
    }
    const payload = formToJob(form);
    if (editingId) {
      update("careers", editingId, payload);
    } else {
      add("careers", payload);
    }
    queryClient.invalidateQueries({ queryKey: queryKeys.careers });
    setDialogOpen(false);
    toast.success(editingId ? "保存成功" : "新增成功");
  };

  const handleDelete = () => {
    if (!deleteId) return;
    remove("careers", deleteId);
    queryClient.invalidateQueries({ queryKey: queryKeys.careers });
    setDeleteId(null);
    toast.success("删除成功");
  };

  const list = [...(careers as JobExt[])].sort((a, b) => {
    const da = a.publishDate ?? "";
    const db = b.publishDate ?? "";
    if (da && db) return db.localeCompare(da);
    return 0;
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">招聘管理</h1>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 mr-2" />
          新增职位
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>职位名称 (ZH)</TableHead>
            <TableHead>部门</TableHead>
            <TableHead>工作地点</TableHead>
            <TableHead>类型</TableHead>
            <TableHead className="w-40">薪资范围</TableHead>
            <TableHead className="w-28">发布日期</TableHead>
            <TableHead className="w-32 text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                暂无数据，点击右上角新增
              </TableCell>
            </TableRow>
          ) : (
            list.map((j) => (
              <TableRow key={j.id}>
                <TableCell>
                  {j.isHot && (
                    <Badge
                      variant="destructive"
                      className="inline-flex items-center gap-1"
                    >
                      <Flame className="w-3 h-3" />
                      热招
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  <div>{j.title?.zh}</div>
                  {j.title?.en && (
                    <div className="text-xs text-muted-foreground">{j.title.en}</div>
                  )}
                </TableCell>
                <TableCell>{j.dept?.zh}</TableCell>
                <TableCell>{j.location?.zh}</TableCell>
                <TableCell>{j.type?.zh}</TableCell>
                <TableCell>{j.salary || "-"}</TableCell>
                <TableCell>{j.publishDate || "-"}</TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(j)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <AlertDialog
                      open={deleteId === j.id}
                      onOpenChange={(open) => !open && setDeleteId(null)}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(j.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除？</AlertDialogTitle>
                          <AlertDialogDescription>
                            删除后将无法恢复，确定要删除该职位吗？
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
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "编辑职位" : "新增职位"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <MultiLangField
              fieldKey="职位名称"
              valueMap={form.title}
              onChange={(v) => setForm({ ...form, title: v })}
            />
            <MultiLangField
              fieldKey="部门"
              valueMap={form.dept}
              onChange={(v) => setForm({ ...form, dept: v })}
            />
            <MultiLangField
              fieldKey="工作地点"
              valueMap={form.location}
              onChange={(v) => setForm({ ...form, location: v })}
            />
            <MultiLangField
              fieldKey="工作类型"
              valueMap={form.type}
              onChange={(v) => setForm({ ...form, type: v })}
            />
            <MultiLangField
              fieldKey="职位描述"
              mode="textarea"
              valueMap={form.description}
              onChange={(v) => setForm({ ...form, description: v })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="job-salary">薪资范围</Label>
                <Input
                  id="job-salary"
                  placeholder="例：20K-40K · 14薪"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-publish">发布日期</Label>
                <Input
                  id="job-publish"
                  type="date"
                  value={form.publishDate}
                  onChange={(e) =>
                    setForm({ ...form, publishDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <Label className="cursor-pointer">设为热招职位</Label>
                <p className="text-xs text-muted-foreground">
                  开启后将在前端显示热招标签
                </p>
              </div>
              <Switch
                checked={form.isHot}
                onCheckedChange={(v) => setForm({ ...form, isHot: v })}
              />
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
