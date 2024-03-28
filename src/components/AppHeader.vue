<template>
  <v-app-bar
    flat
    color="transparent"
  >
    <v-container>
      <v-row>
        <v-spacer />
        <v-col cols="auto">
          <v-menu location="bottom">
            <template #activator="{ props: p }">
              <v-btn
                v-bind="p"
                size="small"
                variant="outlined"
                color="white"
                prepend-icon="mdi-earth"
              >
                {{ currentLang.shortName }}
              </v-btn>
            </template>
            <v-list
              :selected="[currentLang]"
              @update:selected="(val) => (currentLang = val[0])"
              select-strategy="single-independent"
              mandatory
              density="compact"
            >
              <v-list-item
                v-for="lang in languageOptions"
                :key="lang.value"
                :value="lang"
                :title="lang.name"
              />
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import i18n from "@/plugins/i18n";
import { languageOptions } from "@/plugins/i18n";
import type { LangOptionObject } from "@/plugins/i18n";

export default defineComponent({
  name: "AppHeader",
  setup() {
    const { t, locale } = useI18n();

    return { t, locale };
  },
  data() {
    return {
      languageOptions,
      currentLang: languageOptions[0] as LangOptionObject
    };
  },
  watch: {
    currentLang() {
      this.saveLang();
    }
  },
  created() {
    this.currentLang = this.restoreLang();
    this.setLang(this.currentLang.value);
  },
  methods: {
    restoreLang() {
      const lang = localStorage.getItem("lang");

      const langOptions = languageOptions.find((val) => val.value === lang);
      return (
        langOptions ||
        languageOptions.find((val) => val.value === this.locale) ||
        languageOptions[0]
      );
    },
    saveLang() {
      localStorage.setItem("lang", this.currentLang.value);
      this.setLang(this.currentLang.value);
    },
    setLang(locale: string) {
      i18n.global.locale.value = locale;
    }
  }
});
</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {
    "test": "en"
  },
  "pl": {
    "test": "pl"
  }
}
</i18n>
