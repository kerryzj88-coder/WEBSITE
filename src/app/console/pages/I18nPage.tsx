import { useState, useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
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
import { Label } from "@/app/components/ui/label";
import { useI18n, queryKeys, type TranslationsShape } from "@/app/lib/api";
import { useDataStore } from "@/app/store/dataStore";

type Lang = keyof TranslationsShape;

interface FlatKey {
  group: string;
  label: string;
  path: string;
  mode?: "input" | "textarea";
}

const FLAT_KEYS: FlatKey[] = [
  // A. nav 导航
  { group: "nav", label: "nav.home", path: "nav.home" },
  { group: "nav", label: "nav.about", path: "nav.about" },
  { group: "nav", label: "nav.products", path: "nav.products" },
  { group: "nav", label: "nav.solutions", path: "nav.solutions" },
  { group: "nav", label: "nav.industries", path: "nav.industries" },
  { group: "nav", label: "nav.news", path: "nav.news" },
  { group: "nav", label: "nav.contact", path: "nav.contact" },
  { group: "nav", label: "nav.careers", path: "nav.careers" },

  // B. hero 首屏
  { group: "hero", label: "hero.badge", path: "hero.badge" },
  { group: "hero", label: "hero.sub", path: "hero.sub" },
  { group: "hero", label: "hero.desc", path: "hero.desc", mode: "textarea" },
  { group: "hero", label: "hero.cta1", path: "hero.cta1" },
  { group: "hero", label: "hero.cta2", path: "hero.cta2" },
  { group: "hero", label: "hero.headline1", path: "hero.headline1" },
  { group: "hero", label: "hero.headline2", path: "hero.headline2" },
  { group: "hero", label: "hero.counterLabel", path: "hero.counterLabel" },

  // C. company 公司信息
  { group: "company", label: "companyFull", path: "companyFull" },
  { group: "company", label: "brand", path: "brand" },
  { group: "company", label: "launch.tagline", path: "launch.tagline" },
  { group: "company", label: "vision", path: "vision" },
  { group: "company", label: "visionText", path: "visionText" },
  { group: "company", label: "mission", path: "mission" },
  { group: "company", label: "missionText", path: "missionText" },
  { group: "company", label: "innovation", path: "innovation" },
  { group: "company", label: "innovationText", path: "innovationText" },
  { group: "company", label: "aboutFull", path: "aboutFull", mode: "textarea" },
  { group: "company", label: "stats[0].label", path: "stats.0.label" },
  { group: "company", label: "stats[1].label", path: "stats.1.label" },
  { group: "company", label: "stats[2].label", path: "stats.2.label" },
  { group: "company", label: "stats[3].label", path: "stats.3.label" },
  { group: "company", label: "divTitle", path: "divTitle" },
  { group: "company", label: "divSub", path: "divSub", mode: "textarea" },
  { group: "company", label: "indTitle", path: "indTitle" },
  { group: "company", label: "indSub", path: "indSub", mode: "textarea" },

  // D. footer 页脚
  { group: "footer", label: "footer.navHeading", path: "footer.navHeading" },
  { group: "footer", label: "footer.productsHeading", path: "footer.productsHeading" },
  { group: "footer", label: "footer.contactHeading", path: "footer.contactHeading" },
  { group: "footer", label: "footerTagline", path: "footerTagline" },
  { group: "footer", label: "address", path: "address" },
  { group: "footer", label: "email", path: "email" },
  { group: "footer", label: "phone", path: "phone" },
  { group: "footer", label: "copyright", path: "copyright" },
  { group: "footer", label: "learnMore", path: "learnMore" },
  { group: "footer", label: "backHome", path: "backHome" },

  // E. products 产品页
  { group: "products", label: "materialsPage.title", path: "materialsPage.title" },
  { group: "products", label: "materialsPage.eyebrow", path: "materialsPage.eyebrow" },
  { group: "products", label: "materialsPage.desc", path: "materialsPage.desc", mode: "textarea" },
  { group: "products", label: "materialsPage.tabs.all", path: "materialsPage.tabs.all" },
  { group: "products", label: "materialsPage.tabs.heat", path: "materialsPage.tabs.heat" },
  { group: "products", label: "materialsPage.tabs.thermal", path: "materialsPage.tabs.thermal" },
  { group: "products", label: "materialsPage.tabs.special", path: "materialsPage.tabs.special" },
  { group: "products", label: "materialsPage.ctaTitle", path: "materialsPage.ctaTitle" },
  { group: "products", label: "materialsPage.ctaDesc", path: "materialsPage.ctaDesc", mode: "textarea" },
  { group: "products", label: "materialsPage.ctaButton", path: "materialsPage.ctaButton" },
  { group: "products", label: "materialsPage.tdsAction", path: "materialsPage.tdsAction" },
  { group: "products", label: "materialsPage.relatedTitle", path: "materialsPage.relatedTitle" },

  // F. fireSafety 防火方案页
  { group: "fireSafety", label: "fireSafetyPage.overviewEyebrow", path: "fireSafetyPage.overviewEyebrow" },
  { group: "fireSafety", label: "fireSafetyPage.overviewTitle", path: "fireSafetyPage.overviewTitle", mode: "textarea" },
  { group: "fireSafety", label: "fireSafetyPage.overviewLead", path: "fireSafetyPage.overviewLead", mode: "textarea" },
  { group: "fireSafety", label: "fireSafetyPage.sections.fire.title", path: "fireSafetyPage.sections.fire.title" },
  { group: "fireSafety", label: "fireSafetyPage.sections.fire.desc", path: "fireSafetyPage.sections.fire.desc", mode: "textarea" },
  { group: "fireSafety", label: "fireSafetyPage.sections.thermal.title", path: "fireSafetyPage.sections.thermal.title" },
  { group: "fireSafety", label: "fireSafetyPage.sections.thermal.desc", path: "fireSafetyPage.sections.thermal.desc", mode: "textarea" },
  { group: "fireSafety", label: "fireSafetyPage.solutionsEyebrow", path: "fireSafetyPage.solutionsEyebrow" },
  { group: "fireSafety", label: "fireSafetyPage.solutionsTitle", path: "fireSafetyPage.solutionsTitle" },
  { group: "fireSafety", label: "fireSafetyPage.standardsEyebrow", path: "fireSafetyPage.standardsEyebrow" },
  { group: "fireSafety", label: "fireSafetyPage.standardsTitle", path: "fireSafetyPage.standardsTitle" },

  // G. news 新闻
  { group: "news", label: "newsTitle", path: "newsTitle" },
  { group: "news", label: "newsSub", path: "newsSub" },
  { group: "news", label: "readMore", path: "readMore" },
  { group: "news", label: "viewAll", path: "viewAll" },
  { group: "news", label: "industryDetailLabels.challenge", path: "industryDetailLabels.challenge" },
  { group: "news", label: "industryDetailLabels.solution", path: "industryDetailLabels.solution" },
  { group: "news", label: "industryDetailLabels.cases", path: "industryDetailLabels.cases" },
  { group: "news", label: "industryDetailLabels.products", path: "industryDetailLabels.products" },

  // H. careers 招聘
  { group: "careers", label: "careersTitle", path: "careersTitle" },
  { group: "careers", label: "careersSub", path: "careersSub", mode: "textarea" },
  { group: "careers", label: "applyNow", path: "applyNow" },
  { group: "careers", label: "careersPage.openPositions", path: "careersPage.openPositions" },
  { group: "careers", label: "careersPage.benefits[0].label", path: "careersPage.benefits.0.label" },
  { group: "careers", label: "careersPage.benefits[0].desc", path: "careersPage.benefits.0.desc", mode: "textarea" },
  { group: "careers", label: "careersPage.benefits[1].label", path: "careersPage.benefits.1.label" },
  { group: "careers", label: "careersPage.benefits[1].desc", path: "careersPage.benefits.1.desc", mode: "textarea" },
  { group: "careers", label: "careersPage.benefits[2].label", path: "careersPage.benefits.2.label" },
  { group: "careers", label: "careersPage.benefits[2].desc", path: "careersPage.benefits.2.desc", mode: "textarea" },

  // I. contact 联系我们
  { group: "contact", label: "contactPage.tagline", path: "contactPage.tagline" },
  { group: "contact", label: "contactPage.contactTitle", path: "contactPage.contactTitle" },
  { group: "contact", label: "contactPage.formTitle", path: "contactPage.formTitle" },
  { group: "contact", label: "contactPage.messagePlaceholder", path: "contactPage.messagePlaceholder" },
  { group: "contact", label: "contactPage.send", path: "contactPage.send" },
  { group: "contact", label: "contactPage.officesEyebrow", path: "contactPage.officesEyebrow" },
  { group: "contact", label: "contactPage.officesTitle", path: "contactPage.officesTitle" },
  { group: "contact", label: "partnersTitle", path: "partnersTitle" },
  { group: "contact", label: "partnersSub", path: "partnersSub", mode: "textarea" },
  { group: "contact", label: "search.open", path: "search.open" },
  { group: "contact", label: "search.placeholder", path: "search.placeholder" },
];

const GROUP_TITLES: Record<string, string> = {
  nav: "A. 导航 (nav)",
  hero: "B. 首屏 (hero)",
  company: "C. 公司信息 (company)",
  footer: "D. 页脚 (footer)",
  products: "E. 产品页 (products)",
  fireSafety: "F. 防火方案页 (fireSafety)",
  news: "G. 新闻与行业 (news)",
  careers: "H. 招聘 (careers)",
  contact: "I. 联系我们 (contact)",
};

const LANGS: { key: Lang; label: string }[] = [
  { key: "zh", label: "ZH 中文" },
  { key: "en", label: "EN 英文" },
  { key: "es", label: "ES 西班牙" },
  { key: "fr", label: "FR 法文" },
];

function getByPath(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let current = obj;
  for (const k of keys) {
    if (current === null || current === undefined) return undefined;
    current = current[k];
  }
  return current;
}

function setByPath(obj: any, path: string, value: any): any {
  if (!obj || !path) return obj;
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  const result = JSON.parse(JSON.stringify(obj));
  let current = result;
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (i === keys.length - 1) {
      current[k] = value;
    } else {
      if (current[k] === null || current[k] === undefined || typeof current[k] !== "object") {
        const nextKey = keys[i + 1];
        current[k] = /^\d+$/.test(nextKey) ? [] : {};
      }
      current = current[k];
    }
  }
  return result;
}

function deepClone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x));
}

export default function I18nPage() {
  const { data: i18nData, isLoading } = useI18n();
  const queryClient = useQueryClient();
  const dataStore = useDataStore();

  const [draft, setDraft] = useState<TranslationsShape | null>(null);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    if (i18nData) {
      setDraft(deepClone(i18nData));
    }
  }, [i18nData]);

  const groupedKeys = useMemo(() => {
    const result: Record<string, FlatKey[]> = {};
    for (const k of FLAT_KEYS) {
      if (!result[k.group]) result[k.group] = [];
      result[k.group].push(k);
    }
    return result;
  }, []);

  const handleChange = (lang: Lang, path: string, value: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      const langTree = setByPath(prev[lang], path, value);
      return { ...prev, [lang]: langTree };
    });
  };

  const handleSave = () => {
    if (!draft) return;
    try {
      dataStore.updateTranslations(draft);
      queryClient.invalidateQueries({ queryKey: queryKeys.i18n });
      toast.success("文案已保存，前台立即生效");
    } catch (err: any) {
      toast.error(err?.message ?? "保存失败");
    }
  };

  const handleReset = () => {
    try {
      dataStore.resetAll();
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      setResetOpen(false);
      toast.success("已重置为默认值");
    } catch (err: any) {
      toast.error(err?.message ?? "重置失败");
    }
  };

  if (isLoading || !draft) {
    return (
      <div className="space-y-6 p-8">
        <div className="animate-pulse h-8 w-48 bg-muted rounded" />
        <div className="animate-pulse h-4 w-64 bg-muted rounded mt-2" />
        <div className="animate-pulse h-64 w-full bg-muted rounded mt-6" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">多语言文案</h2>
          <p className="text-muted-foreground mt-1">
            管理中 / 英 / 西 / 法 四语文案，分组编辑后点击「保存全部修改」即可立即生效
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" type="button">
                重置为默认值
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认重置为默认值？</AlertDialogTitle>
                <AlertDialogDescription>
                  此操作会将包括多语言文案、产品、新闻、合作伙伴等在内的所有数据恢复为初始默认值，且无法撤销。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>
                  确认重置
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button type="button" onClick={handleSave}>
            保存全部修改
          </Button>
        </div>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["nav"]}
        className="w-full space-y-2"
      >
        {(Object.keys(GROUP_TITLES) as (keyof typeof GROUP_TITLES)[]).map(
          (groupKey) => {
            const keys = groupedKeys[groupKey] ?? [];
            if (keys.length === 0) return null;
            return (
              <AccordionItem
                key={groupKey}
                value={groupKey}
                className="rounded-lg border px-4 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold">{GROUP_TITLES[groupKey]}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {keys.length} 条文案
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="grid grid-cols-4 gap-2 mb-3 px-1">
                    {LANGS.map((l) => (
                      <div key={l.key}>
                        <Label className="text-xs font-medium text-muted-foreground">
                          {l.label}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {keys.map((fk) => (
                      <div key={fk.path} className="space-y-1">
                        <div className="text-[11px] font-mono text-muted-foreground px-1">
                          {fk.label}
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {LANGS.map(({ key: langKey }) => {
                            const val =
                              getByPath(draft[langKey], fk.path) ?? "";
                            const stringVal =
                              typeof val === "string"
                                ? val
                                : val != null
                                  ? String(val)
                                  : "";
                            const commonProps = {
                              value: stringVal,
                              onChange: (
                                e: React.ChangeEvent<
                                  HTMLInputElement | HTMLTextAreaElement
                                >
                              ) => handleChange(langKey, fk.path, e.target.value),
                              className: "text-sm",
                              placeholder: `(${langKey}) ${fk.label}`,
                            };
                            return fk.mode === "textarea" ? (
                              <Textarea
                                key={langKey}
                                {...(commonProps as any)}
                                rows={3}
                              />
                            ) : (
                              <Input key={langKey} {...commonProps} />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          }
        )}
      </Accordion>
    </div>
  );
}
