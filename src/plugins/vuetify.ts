import "@mdi/font/css/materialdesignicons.css";
import { useI18n } from "vue-i18n";
import { createVuetify } from "vuetify";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";

import i18n from "@/plugins/i18n";
import "@/styles/main.scss";

export default createVuetify({
  theme: {
    defaultTheme: "dark"
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  }
});
