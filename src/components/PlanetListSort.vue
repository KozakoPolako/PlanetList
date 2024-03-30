<template>
  <v-select
    ref="sortSelectRef"
    v-model="model"
    v-model:focused="isFocused"
    :items="sortOptions"
    return-object
    :label="t('sortBy')"
    :item-title="(item) => `${t(`properties.${item.property}`)}: ${t(item.order)}`"
    variant="outlined"
    density="compact"
    hide-details
    v-bind="$attrs"
  ></v-select>
</template>

<script lang="ts">
import { type PropType, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import type { VSelect } from "vuetify/components";

import { type SwapiPlanet } from "@/apis/swapi";

const avaiableSortsProperties: Partial<keyof SwapiPlanet>[] = [
  "name",
  "population",
  "rotation_period",
  "climate",
  "gravity",
  "created",
  "url"
];

export default defineComponent({
  name: "PlanetListSort",
  props: {
    modelValue: {
      type: Object as PropType<SortItem | undefined>,
      required: true
    }
  },
  emits: ["update:modelValue"],
  setup() {
    const { t } = useI18n();
    const sortSelectRef = ref<VSelectRef>();

    return { t, sortSelectRef };
  },
  data() {
    return {
      isFocused: false
    };
  },
  computed: {
    model: {
      get(): SortItem | undefined {
        return this.modelValue;
      },
      set(val: SortItem) {
        this.$emit("update:modelValue", val);
        this.blurInput();
      }
    },
    sortOptions() {
      const sortOptions: SortItem[] = [];
      for (const item of avaiableSortsProperties) {
        sortOptions.push({
          property: item,
          order: "asc"
        });
        sortOptions.push({
          property: item,
          order: "desc"
        });
      }
      return sortOptions;
    }
  },
  methods: {
    sortItems(items: SwapiPlanet[], key: keyof SwapiPlanet, order: "asc" | "desc") {
      return items.toSorted((a, b) => {
        if (this.isUnknown(a[key] + "") || this.isUnknown(b[key] + "")) {
          return this.sortUnknown(a[key] + "", b[key] + "");
        }
        switch (key) {
          case "name":
          case "url":
          case "climate":
            return this.sortAlphabeticaly(a[key], b[key], order);
          case "rotation_period":
          case "population":
            return this.sortNumeric(a[key], b[key], order);
          case "gravity":
            return this.sortGravity(a[key], b[key], order);
          case "created":
            return this.sortDate(a[key], b[key], order);
          default:
            throw new Error("Invalid Sort Key");
        }
      });
    },
    sortAlphabeticaly(a: string, b: string, order: "asc" | "desc") {
      const result = a.localeCompare(b);
      return order == "asc" ? result : this.getDesc(result);
    },
    sortNumeric(a: string, b: string, order: "asc" | "desc") {
      const result = parseFloat(a.replace(",", ".")) - parseFloat(b.replace(",", "."));
      return order == "asc" ? result : this.getDesc(result);
    },
    sortGravity(a: string, b: string, order: "asc" | "desc") {
      // get trimmed numeric gravity value
      const aNumeric = a
        .split(", ")[0]
        .replace(" standard", "")
        .split(/\s+(?![^[]*\]|[^(]*\)|[^{]*})/)[0];
      const bNumeric = b
        .split(", ")[0]
        .replace(" standard", "")
        .split(/\s+(?![^[]*\]|[^(]*\)|[^{]*})/)[0];

      return this.sortNumeric(aNumeric, bNumeric, order);
    },
    sortDate(a: string, b: string, order: "asc" | "desc") {
      const aDate = new Date(a);
      const bDate = new Date(b);

      let result;
      switch (true) {
        case aDate < bDate:
          result = -1;
          break;
        case aDate > bDate:
          result = 1;
          break;
        default:
          result = 0;
          break;
      }
      return order == "asc" ? result : this.getDesc(result);
    },
    sortUnknown(a: string, b: string) {
      switch (true) {
        case this.isUnknown(a) && this.isUnknown(b):
          return 0;
        case this.isUnknown(a):
          return 1;
        default:
          return -1;
      }
    },
    getDesc(result: number) {
      switch (true) {
        case result > 0:
          return -1;
        case result < 0:
          return 1;
        default:
          return 0;
      }
    },
    isUnknown(val: string) {
      return val === "unknown" || val === "N/A";
    },
    blurInput() {
      if (this.sortSelectRef) {
        const input: HTMLInputElement = this.sortSelectRef.$el.querySelector("input");
        if (input) {
          input.blur();
        }
      }
    }
  },
  expose: ["sortItems"]
});

type VSelectRef = VSelect & {};

export type SortItem = {
  property: keyof SwapiPlanet;
  order: "asc" | "desc";
};
</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {
    "sortBy": "Sort by",
    "properties": {
      "name": "Name",
      "population": "Population",
      "rotation_period": "Rotation preiod",
      "climate": "Climate",
      "gravity": "Gravity",
      "created": "Created",
      "url": "URL"
    },
    "asc": "ascending",
    "desc": "descending"
  },
  "pl": {
    "sortBy": "Sortowanie",
    "properties": {
      "name": "Nazwa",
      "population": "Populacja",
      "rotation_period": "Okres obrotu",
      "climate": "Klimat",
      "gravity": "Grawitacja",
      "created": "Utworzono",
      "url": "URL"
    },
    "asc": "rosnąco",
    "desc": "malejąco"
  }
}
</i18n>
