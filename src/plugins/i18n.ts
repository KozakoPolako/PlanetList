import { createI18n } from "vue-i18n";
import { en, pl } from "vuetify/locale";

export default createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: "en",
  messages: {
    en: {
      $vuetify: { ...en }
    },
    pl: {
      $vuetify: { ...pl }
    }
  }
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
