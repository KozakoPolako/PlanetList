<template>
  <v-skeleton-loader
    v-intersect="onIntersect"
    type="image"
    class="bg-transparent planet-loader mb-4"
  ></v-skeleton-loader>
  <v-skeleton-loader
    v-for="i in 4"
    :key="i"
    type="image"
    class="bg-transparent planet-loader mb-4"
  ></v-skeleton-loader>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlanetListLoader",
  emits: ["loadMoreRecords"],
  data() {
    return {};
  },
  methods: {
    onIntersect(isIntersecting: boolean) {
      if (isIntersecting) {
        this.$emit("loadMoreRecords");
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.planet-loader :deep(.v-skeleton-loader__bone) {
  border-radius: 4px;
}
</style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
