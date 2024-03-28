import type { App } from "vue";
import vuetify from "@/plugins/vuetify";

import i18n from "@/plugins/i18n";
import toastify, { toastOptions } from "@/plugins/toastify";

export function registerPlugins(app: App) {
  app.use(vuetify).use(i18n).use(toastify, toastOptions);
}
