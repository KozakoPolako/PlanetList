import { createI18n } from "vue-i18n";

export default createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: "en"
});

export type LangOptions = "pl" | "en";
