<template>
  <v-text-field
    v-model="model"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    :label="t('label')"
    v-bind="$attrs"
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
  data() {
    return {};
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
