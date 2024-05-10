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
  methods: {}
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
