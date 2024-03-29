<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="10"
        lg="8"
      >
        <PlanetListSearch
          v-model="search"
          type="search"
          :loading="loading.data"
        />
        <div style="height: 50px"></div>
        <v-row>
          <v-col
            cols="6"
            md="3"
            lg="2"
          >
            <v-select
              v-model:model-value="paginationType"
              :items="paginationTypes"
              item-value="value"
              :label="t('paginationTypeText')"
              :item-title="(item) => t(item.translation_key)"
              variant="outlined"
              density="compact"
            ></v-select>
          </v-col>
          <v-spacer />
          <v-col
            cols="6"
            md="4"
            lg="3"
          >
            <v-select
              :items="paginationTypes"
              item-value="value"
              :label="t('sortBy')"
              :item-title="(item) => t(item.translation_key)"
              variant="outlined"
              density="compact"
            ></v-select>
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
        <PlanetListLoader
          v-if="isNextPage"
          @load-more-records="loadMoreRecord"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import type { DebouncedFunc } from "lodash";
import debounce from "lodash/debounce";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import PlanetListLoader from "@/components/PlanetListLoader.vue";
import PlanetListSearch from "@/components/PlanetListSearch.vue";

import { type ListFetchOptions, type SwapiPlanet, fetchPlanets } from "@/apis/swapi";
import { usePagination } from "@/composables/usePagination";

const DEBOUCE_TIME = 500;

const paginationTypes = [
  {
    translation_key: "paginationType.list",
    value: "LIST"
  },
  {
    translation_key: "paginationType.table",
    value: "Table"
  }
];

export default defineComponent({
  name: "PlanetList",
  components: { PlanetListSearch, PlanetListLoader },
  setup() {
    const { t } = useI18n();
    const { pagination, isNextPage, pageCount } = usePagination(10);
    return { t, pagination, isNextPage, pageCount };
  },
  data() {
    return {
      paginationTypes,
      search: "",
      paginationType: "LIST" as PaginationType,
      loading: {
        data: false
      },
      items: [] as SwapiPlanet[],
      isDataInited: false,
      debounced: {
        loadData: undefined as DebouncedFunc<() => Promise<void>> | undefined
      }
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
  watch: {
    fetchParams() {
      console.log("fetchParams");
      if (!this.isDataInited || !this.debounced.loadData) return;
      this.debounced.loadData();
    },
    search() {
      this.pagination.page = 1;
    }
  },
  async mounted() {
    this.debounced.loadData = debounce(this.loadData, DEBOUCE_TIME);
    await this.loadData();
    this.isDataInited = true;
  },
  methods: {
    async loadData() {
      try {
        this.loading.data = true;
        const data = await fetchPlanets(this.fetchParams);
        this.items = this.mapData(data.results);
        this.pagination.totalElements = data.count;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading.data = false;
      }
    },
    loadMoreRecord() {
      if (this.isDataInited && this.isNextPage) {
        console.log("append");
        this.pagination.page = this.pagination.page + 1;
        console.log("page", this.pagination.page);
        console.log("params", this.fetchParams);
      }
    },
    mapData(planets: SwapiPlanet[]) {
      if (this.pagination.page === 1) return planets;
      switch (this.paginationType) {
        case "LIST":
          return this.items.concat(planets);
        case "TABLE":
          return planets;
      }
    }
  }
});

type PaginationType = "LIST" | "TABLE";
</script>

<style lang="scss" scoped>
.planet-loader :deep(.v-skeleton-loader__bone) {
  border-radius: 4px;
}
</style>
<i18n lang="json">
{
  "en": {
    "paginationTypeText": "Pagination method",
    "paginationType": {
      "list": "List",
      "table": "Table"
    },
    "sortBy": "Sort by"
  },
  "pl": {
    "paginationTypeText": "Rodzaj paginacji",
    "paginationType": {
      "list": "Lista",
      "table": "Tabela"
    },
    "sortBy": "Sortowanie"
  }
}
</i18n>
