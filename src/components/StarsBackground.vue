<template>
  <div id="background"></div>
  <div id="background-container">
    <div id="stars-box">
      <div id="stars" />
      <div
        ref="stars2Ref"
        id="stars2"
      />
      <div
        ref="stars3Ref"
        id="stars3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "StarsBackground",
  setup() {
    const stars2Ref = ref<HTMLDivElement>();
    const stars3Ref = ref<HTMLDivElement>();
    return { stars2Ref, stars3Ref };
  },
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      if (!this.stars2Ref || !this.stars3Ref) return;

      const offset = window.scrollY;
      this.stars2Ref.style.transform = `translateY(-${offset * 0.2}px)`;
      this.stars3Ref.style.transform = `translateY(-${offset * 0.4}px)`;
    }
  }
});
</script>

<style lang="scss" scoped>
// Based on https://codepen.io/sarazond/pen/LYGbwj
@use "sass:math";

$full-height: 100vh;

@supports (height: 100dvh) {
  $full-height: 100dvh;
}

$stars_width: 2800;
$stars_height: 25000;

@function multiple-box-shadow($n) {
  $value: "#{math.random($stars_width)}px #{math.random($stars_height)}px #FFF";
  @for $i from 2 through $n {
    $value: "#{$value} , #{math.random($stars_width)}px #{math.random($stars_height)}px #FFF";
  }

  @return unquote($value);
}

$shadows-small: multiple-box-shadow(math.ceil($stars_width * 1.3));
$shadows-medium: multiple-box-shadow(math.ceil($stars_width * 0.9));
$shadows-big: multiple-box-shadow(math.ceil($stars_width * 0.5));

#background-container {
  z-index: -1;
  display: flex;
  justify-content: center;
}

#background {
  z-index: -1;
  position: fixed;
  height: $full-height;
  width: 100vw;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
}

#stars-box {
  width: ($stars_width) + px;
}

#stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: $shadows-small;
  transition: transform 200ms linear;

  &:after {
    content: " ";
    position: absolute;
    top: $stars_width;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: $shadows-small;
  }
}

#stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: $shadows-medium;
  transition: transform 100ms ease-out;

  &:after {
    content: " ";
    position: absolute;
    top: $stars_width;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: $shadows-medium;
  }
}

#stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: $shadows-big;
  transition: transform 100ms ease-out;

  &:after {
    content: " ";
    position: absolute;
    top: $stars_width;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: $shadows-big;
  }
}
</style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
