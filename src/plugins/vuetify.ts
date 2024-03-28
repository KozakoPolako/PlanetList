import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

import "@/styles/main.scss";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark"
  }
});
