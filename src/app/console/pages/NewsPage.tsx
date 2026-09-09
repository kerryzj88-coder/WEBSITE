import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Pin } from "lucide-react";
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
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { MultiLangField, type LangValueMap } from "../components/MultiLangField";
import { useNews, queryKeys, type NewsItem as BaseNewsItem } from "../../lib/api";
import { useDataStore } from "../../store/dataStore";

interface NewsItemExt extends BaseNewsItem {
  status?: "published" | "draft";
  isPinned?: boolean;
}

interface FormState {
  date: LangValueMap;
  tag: LangValueMap;
  title: LangValueMap;
  desc: LangValueMap;
  href: string;
  image: string;
  status: "published" | "draft";
  isPinned: boolean;
}

const emptyLangMap = (): LangValueMap => ({ zh: "", en: "", es: "", fr: "" });

const emptyForm = (): FormState => ({
  date: emptyLangMap(),
  tag: emptyLangMap(),
  title: emptyLangMap(),
  desc: emptyLangMap(),
  href: "",
  image: "",
  status: "draft",
  isPinned: false,
});

function newsDateStr(item: NewsItemExt): string {
  return item.date?.zh || item.date?.en || "";
}

function newsDateToInputValue(item: NewsItemExt): string {
  const d = newsDateStr(item);
  return d?.match(/^\d{4}-\d{2}-\d{2}$/) ? d : "";
}

function syncDateFromInput(form: FormState, iso: string): FormState {
  return {
    ...form,
    date: {
      zh: iso,
      en: iso,
      es: iso,
      fr: iso,
    },
  };
}

export default function NewsPage() {
  const queryClient = useQueryClient();
  const { data: news = [] } = useNews();
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

  const openEdit = (item: NewsItemExt) => {
    setEditingId(item.id);
    setForm({
      date: { ...emptyLangMap(), ...(item.date ?? {}) },
      tag: { ...emptyLangMap(), ...(item.tag ?? {}) },
      title: { ...emptyLangMap(), ...(item.title ?? {}) },
      desc: { ...emptyLangMap(), ...(item.desc ?? {}) },
      href: item.href ?? "",
      image: item.image ?? "",
      status: item.status ?? "draft",
      isPinned: item.isPinned ?? false,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.zh.trim() && !form.title.en.trim()) {
      toast.error("请填写至少一种语言的标题");
      return;
    }
    if (!form.image.trim()) {
      toast.error("请填写封面图 URL");
      return;
    }

    const payload: NewsItemExt = {
      id: editingId ?? (typeof crypto !== "undefined" ? crypto.randomUUID() : Date.now().toString()),
      date: form.date,
      tag: form.tag,
      title: form.title,
      desc: form.desc,
      href: form.href.trim(),
      image: form.image.trim(),
      status: form.status,
      isPinned: form.isPinned,
    };

    if (editingId) {
      update("news", editingId, payload);
    } else {
      add("news", payload);
    }
    queryClient.invalidateQueries({ queryKey: queryKeys.news });
    setDialogOpen(false);
    toast.success(editingId ? "保存成功" : "新增成功");
  };

  const handleDelete = () => {
    if (!deleteId) return;
    remove("news", deleteId);
    queryClient.invalidateQueries({ queryKey: queryKeys.news });
    setDeleteId(null);
    toast.success("删除成功");
  };

  const sortedList = [...(news as NewsItemExt[])].sort((a, b) => {
    if (!!b.isPinned !== !!a.isPinned) return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
    const da = newsDateStr(a);
    const db = newsDateStr(b);
    return db.localeCompare(da);
  });

  const renderStatusBadge = (item: NewsItemExt) => {
    const isPublished = item.status === "published";
    const isPinned = !!item.isPinned;
    return (
      <div className="flex flex-wrap gap-1">
        {isPinned && (
          <Badge variant="default" className="bg-amber-500 hover:bg-amber-500/90">
            <Pin className="w-3 h-3 mr-1" />
            置顶
          </Badge>
        )}
        {isPublished ? (
          <Badge variant="default">已发布</Badge>
        ) : (
          <Badge variant="secondary">草稿</Badge>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">新闻动态</h1>
          <p className="text-muted-foreground text-sm mt-1">管理官网新闻与动态资讯</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 mr-2" />
          新增新闻
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">日期</TableHead>
            <TableHead className="w-32">标签</TableHead>
            <TableHead>中文标题</TableHead>
            <TableHead>英文标题</TableHead>
            <TableHead className="w-48">封面图</TableHead>
            <TableHead className="w-36">状态</TableHead>
            <TableHead className="w-32 text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                暂无数据，点击右上角新增
              </TableCell>
            </TableRow>
          ) : (
            sortedList.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-xs">{newsDateStr(item)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.tag?.zh || item.tag?.en || "-"}</Badge>
                </TableCell>
                <TableCell className="font-medium max-w-[260px] truncate" title={item.title?.zh}>
                  {item.title?.zh || "-"}
                </TableCell>
                <TableCell className="max-w-[260px] truncate text-muted-foreground" title={item.title?.en}>
                  {item.title?.en || "-"}
                </TableCell>
                <TableCell>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title?.zh || item.title?.en || "news cover"}
                    className="h-14 w-28 object-cover rounded border"
                  />
                </TableCell>
                <TableCell>{renderStatusBadge(item)}</TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(item)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <AlertDialog
                      open={deleteId === item.id}
                      onOpenChange={(open) => !open && setDeleteId(null)}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除？</AlertDialogTitle>
                          <AlertDialogDescription>
                            删除后将无法恢复，确定要删除该新闻吗？
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
            <DialogTitle>{editingId ? "编辑新闻" : "新增新闻"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="news-date">发布日期</Label>
                <Input
                  id="news-date"
                  type="date"
                  value={newsDateToInputValue(form as unknown as NewsItemExt)}
                  onChange={(e) => setForm(syncDateFromInput(form, e.target.value))}
                />
              </div>
              <div className="flex items-end space-x-3 pb-1">
                <Switch
                  id="news-published"
                  checked={form.status === "published"}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, status: checked ? "published" : "draft" })
                  }
                />
                <Label htmlFor="news-published" className="!mb-0 cursor-pointer">
                  已发布
                </Label>
              </div>
              <div className="flex items-end space-x-3 pb-1">
                <Switch
                  id="news-pinned"
                  checked={form.isPinned}
                  onCheckedChange={(checked) => setForm({ ...form, isPinned: checked })}
                />
                <Label htmlFor="news-pinned" className="!mb-0 cursor-pointer">
                  置顶
                </Label>
              </div>
            </div>

            <MultiLangField
              fieldKey="标题"
              valueMap={form.title}
              onChange={(v) => setForm({ ...form, title: v })}
              mode="input"
            />

            <MultiLangField
              fieldKey="标签"
              valueMap={form.tag}
              onChange={(v) => setForm({ ...form, tag: v })}
              mode="input"
            />

            <MultiLangField
              fieldKey="摘要"
              valueMap={form.desc}
              onChange={(v) => setForm({ ...form, desc: v })}
              mode="textarea"
            />

            <MultiLangField
              fieldKey="跳转链接"
              valueMap={{
                zh: form.href,
                en: form.href,
                es: form.href,
                fr: form.href,
              }}
              onChange={(v) =>
                setForm({ ...form, href: v.zh || v.en || "" })
              }
              mode="input"
              placeholder="https://..."
            />

            <div className="space-y-2">
              <Label htmlFor="news-image">封面图 URL</Label>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-start">
                <Input
                  id="news-image"
                  placeholder="https://..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
                <ImageWithFallback
                  src={form.image || ""}
                  alt="cover preview"
                  className="h-20 w-40 object-cover rounded border bg-muted/30"
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
