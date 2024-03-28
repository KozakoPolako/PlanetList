<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <PlanetListSearch v-model="search" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PlanetListSearch from "@/components/PlanetListSearch.vue";

export default defineComponent({
  name: "PlanetList",
  components: { PlanetListSearch },
  data() {
    return {
      search: "",
      loading: {
        data: false
      }
    };
  },
  computed: {
    fetchParams() {
      return {
        search: this.search
      };
    }
  },
  methods: {}
});
</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
