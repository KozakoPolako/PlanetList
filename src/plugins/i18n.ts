import { createI18n } from "vue-i18n";

export default createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: "en"
});

export const languageOptions: LangOptionObject[] = [
  // Fallback first
  {
    name: "English",
    shortName: "EN",
    value: "en"
  },
  {
    name: "Polski",
    shortName: "PL",
    value: "pl"
  }
];

export type LangOptions = "pl" | "en";

export type LangOptionObject = {
  name: string;
  shortName: string;
  value: LangOptions;
};
