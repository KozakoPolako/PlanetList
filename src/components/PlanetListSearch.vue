<template>
  <v-text-field
    prepend-inner-icon="mdi-magnify"
    v-model="model"
    variant="outlined"
    hide-details
    :label="t('label')"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "PlanetListSearch",
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  computed: {
    model: {
      get(): string {
        return this.modelValue;
      },
      set(val: string) {
        this.$emit("update:modelValue", val);
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
});
</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {
    "label": "Search"
  },
  "pl": {
    "label": "Szukaj"
  }
}
</i18n>
