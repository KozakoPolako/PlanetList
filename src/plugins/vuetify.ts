import "@mdi/font/css/materialdesignicons.css";
import { useI18n } from "vue-i18n";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import "vuetify/styles";

import i18n from "@/plugins/i18n";
import "@/styles/main.scss";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark"
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  }
});
