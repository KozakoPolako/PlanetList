<template>
  <v-app-bar
    flat
    absolute
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
                class="lang-change-btn"
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
import dayjs from "dayjs";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import i18n from "@/plugins/i18n";
import { type LangOptionObject, type LangOptions, languageOptions } from "@/plugins/i18n";

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
  mounted() {
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
    setLang(locale: LangOptions) {
      i18n.global.locale.value = locale;
      dayjs.locale(locale);
    }
  }
});
</script>

<style lang="scss" scoped>
.lang-change-btn {
  border-color: rgba(var(--v-border-color), 0.38);
  border-width: 1px;
  transition: border 250ms ease;
  background-color: rgba(var(--v-theme-surface), 0.4);
}
.lang-change-btn:hover {
  border-width: 1px;
  border-color: rgba(var(--v-border-color));
}
</style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
