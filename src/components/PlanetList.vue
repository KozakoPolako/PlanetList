<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <PlanetListSearch
          v-model="search"
          :loading="loading.data"
        />
      </v-col>
    </v-row>
    <v-card
      v-for="planet in items"
      :key="planet.url"
      class="mb-4"
    >
      <v-card-title>{{ planet.name }}</v-card-title>
      <v-card-text>{{ planet }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PlanetListSearch from "@/components/PlanetListSearch.vue";

import { type ListFetchOptions, type SwapiPlanet, fetchPlanets } from "@/apis/swapi";

export default defineComponent({
  name: "PlanetList",
  components: { PlanetListSearch },
  data() {
    return {
      search: "",
      pagination: {
        page: 1,
        totalElements: 0
      },
      loading: {
        data: false
      },
      items: [] as SwapiPlanet[]
    };
  },
  computed: {
    fetchParams(): ListFetchOptions {
      return {
        search: this.search,
        page: this.pagination.page
      };
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        this.loading.data = true;
        const data = await fetchPlanets(this.fetchParams);
        this.items = data.results;
        this.pagination.totalElements = data.count;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading.data = false;
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
