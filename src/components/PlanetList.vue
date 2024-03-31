<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        lg="9"
      >
        <PlanetListSearch
          v-model="search"
          type="search"
          class="mb-2"
        />
        <v-row dense>
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
              hide-details
            ></v-select>
          </v-col>
          <v-spacer />
          <v-col
            cols="6"
            md="4"
            lg="3"
          >
            <PlanetListSort
              ref="sortRef"
              v-model="sort"
              @update:model-value="sortItems"
            />
          </v-col>
        </v-row>
        <v-progress-linear
          indeterminate
          :color="loading.data ? 'white' : 'transparent'"
          class="mb-2"
        />

        <p
          v-if="!items.length && !loading.data"
          class="text-center"
        >
          {{ t("$vuetify.noDataText") }}
        </p>
        <PlanetListCard
          v-for="planet in items"
          :key="planet.url"
          :planet="planet"
          class="mb-3 planet-card"
          :class="{ disabled: paginationType === 'TABLE' && loading.data }"
        />
        <template v-if="paginationType === 'TABLE'">
          <PlanetListLoader
            v-if="!items.length && loading.data"
            @load-more-records="loadMoreRecord"
          />
          <v-row
            v-if="isDataInited && pageCount > 1"
            justify="center"
          >
            <v-col cols="auto">
              <v-pagination
                v-model="pagination.page"
                :length="pageCount"
              />
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <PlanetListLoader
            v-if="isNextPage || loading.data"
            @load-more-records="loadMoreRecord"
          />
        </template>
        <div style="height: 30vh" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import type { DebouncedFunc } from "lodash";
import debounce from "lodash/debounce";
import { defineComponent } from "vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import PlanetListCard from "@/components/PlanetListCard.vue";
import PlanetListLoader from "@/components/PlanetListLoader.vue";
import PlanetListSearch from "@/components/PlanetListSearch.vue";
import PlanetListSort, { type SortItem } from "@/components/PlanetListSort.vue";

import { type ListFetchOptions, type SwapiPlanet, fetchPlanets } from "@/apis/swapi";
import { usePagination } from "@/composables/usePagination";
import { handleError } from "@/utils";

const DEBOUCE_TIME = 300;

const paginationTypes = [
  {
    translation_key: "paginationType.list",
    value: "LIST"
  },
  {
    translation_key: "paginationType.table",
    value: "TABLE"
  }
];

export default defineComponent({
  name: "PlanetList",
  components: { PlanetListSearch, PlanetListLoader, PlanetListCard, PlanetListSort },
  setup() {
    const { t } = useI18n();
    const { pagination, isNextPage, pageCount } = usePagination(10);
    const sortRef = ref<PlanetListSortRef>();

    return { t, pagination, isNextPage, pageCount, sortRef };
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
      },
      sort: undefined as SortItem | undefined
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
      this.resetPage();
    },
    paginationType() {
      this.resetPage();
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
        this.sort = undefined;
      } catch (error) {
        this.pagination.totalElements = 0;
        console.error(error);
        handleError(error, this.t("fetchDataError"));
      } finally {
        this.loading.data = false;
      }
    },
    loadMoreRecord() {
      if (this.isDataInited && this.isNextPage) {
        this.pagination.page = this.pagination.page + 1;
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
    },
    resetPage() {
      this.pagination.page = 1;
    },
    sortItems() {
      if (this.sortRef && this.sort) {
        this.items = this.sortRef.sortItems(this.items, this.sort.property, this.sort.order);
      }
    }
  }
});

type PlanetListSortRef = InstanceType<typeof PlanetListSort> & {};
type PaginationType = "LIST" | "TABLE";
</script>

<style lang="scss" scoped>
.planet-card.disabled {
  pointer-events: none;
  opacity: var(--v-disabled-opacity);
}

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
    "fetchDataError": "Unable to fetch planet list"
  },
  "pl": {
    "paginationTypeText": "Rodzaj paginacji",
    "paginationType": {
      "list": "Lista",
      "table": "Tabela"
    },
    "fetchDataError": "Nie udało się pobrać listy planet"
  }
}
</i18n>
