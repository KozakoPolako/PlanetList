<template>
  <v-app class="bg-transparent">
    <StarsBackground />
    <AppHeader />
    <v-main>
      <!-- Spacer -->
      <div style="height: 150px" />
      <v-row
        justify="center"
        class="mb-4"
      >
        <v-col cols="auto">
          <h1 class="text-title text-h1 text-center">{{ t("title") }}</h1>
          <v-btn @click="downloadFile">TEST LINK</v-btn>
          <v-btn @click="downloadFilePDF">TEST PDF</v-btn>
        </v-col>
      </v-row>
      <PlanetList />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import AppHeader from "@/components/AppHeader.vue";
import PlanetList from "@/components/PlanetList.vue";
import StarsBackground from "@/components/StarsBackground.vue";

export default defineComponent({
  name: "App",
  components: { StarsBackground, AppHeader, PlanetList },
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },
  data() {
    return {};
  },
  watch: {
    locale: {
      handler() {
        document.title = this.t("title");
      },
      immediate: true
    }
  },
  methods: {
    async downloadFile() {
      const link = document.createElement("a");
      // const response = await fetch(
      //   new Request(
      //     "https://documents.ecare.t-mobile.pl/bff/documents/ecare-regulation?locale=en_GB",
      //     { method: "GET", mode: "no-cors" }
      //   )
      // );
      //console.log(await response);
      const blob = new Blob([], { type: "application/octet-stream" });
      link.href = window.URL.createObjectURL(blob);
      link.download = "TEST.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    async downloadFilePDF() {
      const link = document.createElement("a");
      // const response = await fetch(
      //   new Request(
      //     "https://documents.ecare.t-mobile.pl/bff/documents/ecare-regulation?locale=en_GB",
      //     { method: "GET", mode: "no-cors" }
      //   )
      // );
      //console.log(await response);
      const blob = new Blob([], { type: "application/pdf" });
      link.href = window.URL.createObjectURL(blob);
      link.download = "TEST.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
});
</script>

<style lang="scss">
.text-title {
  background: -webkit-linear-gradient(white, #38495a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (min-width: 1904px) {
  .v-container:not(.container--fluid) {
    max-width: 1280px !important;
  }
}

@media (min-width: 960px) {
  .v-container:not(.container--fluid) {
    max-width: 1280px !important;
  }
}
</style>
<i18n lang="json">
{
  "en": {
    "title": "Planet list"
  },
  "pl": {
    "title": "Lista planet"
  }
}
</i18n>
