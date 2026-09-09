import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/app/components/ui/utils";

type Lang = "zh" | "en" | "es" | "fr";

export type LangValueMap = Record<Lang, string>;

export interface MultiLangFieldProps {
  fieldKey: string;
  valueMap?: Partial<LangValueMap>;
  onChange?: (value: LangValueMap) => void;
  mode?: "input" | "textarea";
  className?: string;
  placeholder?: string;
}

const LANGS: { value: Lang; label: string }[] = [
  { value: "zh", label: "ZH" },
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
  { value: "fr", label: "FR" },
];

const DEFAULT_VALUES: LangValueMap = { zh: "", en: "", es: "", fr: "" };

export function MultiLangField({
  fieldKey,
  valueMap,
  onChange,
  mode = "input",
  className,
  placeholder,
}: MultiLangFieldProps) {
  const [activeLang, setActiveLang] = useState<Lang>("zh");
  const current = useMemo<LangValueMap>(
    () => ({ ...DEFAULT_VALUES, ...(valueMap ?? {}) }),
    [valueMap]
  );

  const handleChange = (lang: Lang, val: string) => {
    const next: LangValueMap = { ...current, [lang]: val };
    onChange?.(next);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {fieldKey && <Label htmlFor={`mlf-${fieldKey}`}>{fieldKey}</Label>}
      <Tabs value={activeLang} onValueChange={(v) => setActiveLang(v as Lang)}>
        <TabsList>
          {LANGS.map((l) => (
            <TabsTrigger key={l.value} value={l.value}>
              {l.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {LANGS.map((l) => (
          <TabsContent key={l.value} value={l.value} className="pt-2">
            {mode === "textarea" ? (
              <Textarea
                id={`mlf-${fieldKey}-${l.value}`}
                placeholder={placeholder ?? `${fieldKey} (${l.label})`}
                value={current[l.value] ?? ""}
                onChange={(e) => handleChange(l.value, e.target.value)}
                rows={4}
              />
            ) : (
              <Input
                id={`mlf-${fieldKey}-${l.value}`}
                placeholder={placeholder ?? `${fieldKey} (${l.label})`}
                value={current[l.value] ?? ""}
                onChange={(e) => handleChange(l.value, e.target.value)}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default MultiLangField;
