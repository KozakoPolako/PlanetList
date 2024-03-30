import type { App } from "vue";

import "@/plugins/dayjs";
import i18n from "@/plugins/i18n";
import toastify, { toastOptions } from "@/plugins/toastify";
import vuetify from "@/plugins/vuetify";

export function registerPlugins(app: App) {
  app.use(vuetify).use(i18n).use(toastify, toastOptions);
}
