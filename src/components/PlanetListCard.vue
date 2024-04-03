<template>
  <fieldset class="planet-card__content rounded">
    <legend>
      <v-card-title class="pa-0">{{ planet.name }}</v-card-title>
    </legend>
    <div class="planet-card__text">
      <v-card-text>
        <v-row dense>
          <PlanetListCardAttribute
            icon="mdi-account-multiple-outline"
            :title="t('properties.population')"
          >
            <span class="font-weight-light">{{ getValue("population", "NUMBER") }} </span>
          </PlanetListCardAttribute>

          <PlanetListCardAttribute
            icon="mdi-web-refresh"
            :title="t('properties.rotationPeriod')"
          >
            <span class="font-weight-light">
              {{
                planet.rotation_period === "unknown" || planet.rotation_period === "N/A"
                  ? getValue("rotation_period", "NUMBER")
                  : t("rotationPeriodDays", parseFloat(getValue("rotation_period", "NUMBER") + ""))
              }}
            </span>
          </PlanetListCardAttribute>

          <PlanetListCardAttribute
            icon="mdi-weather-partly-cloudy"
            :title="t('properties.climate')"
          >
            <span class="font-weight-light">{{ getValue("climate", "CLIMATE") }}</span>
          </PlanetListCardAttribute>

          <PlanetListCardAttribute
            icon="mdi-elevator-down"
            :title="t('properties.gravity')"
          >
            <span class="font-weight-light">{{ getValue("gravity", "GRAVITY") }} </span>
          </PlanetListCardAttribute>

          <PlanetListCardAttribute
            icon="mdi-calendar-edit"
            :title="t('properties.created')"
          >
            <v-tooltip location="bottom">
              <template #activator="{ props: p }">
                <span
                  v-bind="p"
                  class="font-weight-light"
                >
                  {{ dayjs(planet.created).format("L") }}
                </span>
              </template>
              <span>{{ dayjs(planet.created).format("L LTS") }}</span>
            </v-tooltip>
          </PlanetListCardAttribute>

          <PlanetListCardAttribute
            icon="mdi-open-in-new"
            :title="t('properties.url')"
          >
            <a
              :href="planet.url"
              target="_blank"
              class="text-white"
              >{{ t("more") }}</a
            >
          </PlanetListCardAttribute>
        </v-row>
      </v-card-text>
    </div>
  </fieldset>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { type PropType, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import PlanetListCardAttribute from "@/components/PlanetListCardAttribute.vue";

import { type SwapiPlanet } from "@/apis/swapi";

export default defineComponent({
  name: "PlanetListCard",
  components: { PlanetListCardAttribute },
  props: {
    planet: {
      type: Object as PropType<SwapiPlanet>,
      required: true
    }
  },
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },
  data() {
    return {
      dayjs
    };
  },
  methods: {
    getValue(key: keyof SwapiPlanet, type: "NUMBER" | "TEXT" | "GRAVITY" | "CLIMATE") {
      if (this.planet[key] === "unknown" || this.planet[key] === "N/A") return this.t("unknown");
      switch (type) {
        case "NUMBER":
          return Intl.NumberFormat(this.locale).format(parseFloat(this.planet[key] + ""));
        case "TEXT":
          return this.planet[key];
        case "GRAVITY":
          return this.mapGravity(this.planet[key] + "");
        case "CLIMATE":
          return this.mapClimate(this.planet[key] + "");
      }
    },
    mapGravity(grafity: string) {
      return grafity
        .split(", ")
        .map((val) => val.replace(" standard", "").split(/\s+(?![^[]*\]|[^(]*\)|[^{]*})/))
        .map((val) => {
          if (val.length === 1) {
            return Intl.NumberFormat(this.locale).format(parseFloat(val[0])) + " G";
          }
          switch (val[1]) {
            case "(surface)":
              return `${Intl.NumberFormat(this.locale).format(parseFloat(val[0]))} G ${this.t("surface")}`;
            case "(Cloud City)":
              return `${Intl.NumberFormat(this.locale).format(parseFloat(val[0]))} G ${this.t("cloudCity")}`;
          }
        })
        .join(", ");
    },
    mapClimate(climate: string) {
      return climate
        .split(", ")
        .map((val) => this.t(`climateValues.${val.trim().replace(" ", "_")}`))
        .join(", ");
    }
  }
});
</script>

<style lang="scss" scoped>
.planet-card__content legend {
  margin-left: 8px;
  padding: 4px;
}
.planet-card__content {
  overflow: visible;
  border-color: rgba(var(--v-border-color), 0.38);
  border-width: 1px;
  transition: border 250ms ease;
  background-color: rgba(var(--v-theme-surface), 0.4);
}
.planet-card__content:hover {
  border-width: 1px;
  border-color: rgba(var(--v-border-color));
}
</style>
<i18n lang="json">
{
  "en": {
    "unknown": "Unknown",
    "properties": {
      "population": "Population",
      "rotationPeriod": "Rotation preiod",
      "climate": "Climate",
      "gravity": "Gravity",
      "created": "Created",
      "url": "URL"
    },
    "more": "More",
    "surface": "(surface)",
    "cloudCity": "(Cloud City)",
    "rotationPeriodDays": "0 days | 1 day | {n} days",
    "climateValues": {
      "arid": "arid",
      "temperate": "temperate",
      "tropical": "tropical",
      "frozen": "frozen",
      "murky": "murky",
      "windy": "windy",
      "hot": "hot",
      "artificial_temperate": "artificial temperate",
      "frigid": "frigid",
      "humid": "humid",
      "moist": "moist",
      "polluted": "polluted",
      "superheated": "superheated",
      "subartic": "subartic",
      "artic": "artic",
      "rocky": "rocky"
    }
  },
  "pl": {
    "properties": {
      "population": "Populacja",
      "rotationPeriod": "Okres obrotu",
      "climate": "Klimat",
      "gravity": "Grawitacja",
      "created": "Utworzono",
      "url": "URL"
    },
    "unknown": "Brak danych",
    "more": "Więcej",
    "surface": "(powierzchnia)",
    "cloudCity": "(Miasto w Chmurach)",
    "rotationPeriodDays": "0 dni | 1 dzień | {n} dni",
    "climateValues": {
      "arid": "suchy",
      "temperate": "umiarkowany",
      "tropical": "tropikalny",
      "frozen": "zamrożony",
      "murky": "mroczny",
      "windy": "wietrzny",
      "hot": "gorący",
      "artificial_temperate": "sztucznie umiarkowany",
      "frigid": "lodowaty",
      "humid": "mokrawy",
      "moist": "wilgotny",
      "polluted": "zanieczyszczony",
      "superheated": "nadgrzewany",
      "subartic": "podarktyczny",
      "artic": "arktyczny",
      "rocky": "skalisty"
    }
  }
}
</i18n>
