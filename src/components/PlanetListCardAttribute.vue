<template>
  <v-col
    cols="12"
    md="6"
  >
    <v-row
      dense
      class="planet-card_attribute"
      align="center"
    >
      <v-col
        cols="6"
        sm="4"
      >
        <p>
          <v-icon
            v-if="icon"
            class="mr-2"
            >{{ icon }}</v-icon
          >
          <b>
            {{ title }}
          </b>
        </p>
      </v-col>
      <v-col cols="">
        <slot></slot>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlanetListCardAttrigute",
  props: {
    title: String,
    icon: String
  },
  data() {
    return {};
  },
  methods: {}
});
</script>

<style lang="scss" scoped>
.planet-card_attribute {
  min-height: 2lh;
}
</style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
