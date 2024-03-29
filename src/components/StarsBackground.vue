<template>
  <div id="background"></div>
  <div id="background-container">
    <div id="stars-box">
      <div id="stars" />
      <div
        ref="stars2"
        id="stars2"
      />
      <div
        ref="stars3"
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
    const stars2 = ref<HTMLDivElement>();
    const stars3 = ref<HTMLDivElement>();
    return { stars2, stars3 };
  },
  data() {
    return {
      screenSize: {
        width: window.screen.width,
        height: window.screen.height
      }
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      if (!this.stars2 || !this.stars3) return;

      const offset = window.scrollY;
      this.stars2.style.transform = `translateY(-${offset * 0.2}px)`;
      this.stars3.style.transform = `translateY(-${offset * 0.4}px)`;
    }
  }
});
</script>

<style lang="scss" scoped>
@use "sass:math";
$stars_width: 2560;
$stars_height: 20000;

@debug calc(100vh);

@function multiple-box-shadow($n) {
  $value: "#{math.random($stars_width)}px #{math.random($stars_height)}px #FFF";
  @for $i from 2 through $n {
    $value: "#{$value} , #{math.random($stars_width)}px #{math.random($stars_height)}px #FFF";
  }

  @return unquote($value);
}

$shadows-small: multiple-box-shadow(math.ceil($stars_width));
$shadows-medium: multiple-box-shadow(math.ceil($stars_width * 0.7));
$shadows-big: multiple-box-shadow(math.ceil($stars_width * 0.4));

#background-container {
  z-index: -1;
  display: flex;
  justify-content: center;
}

#background {
  z-index: -1;
  position: fixed;
  height: 100vh;
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
  //animation: animStar 150s linear infinite;

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
  //animation: animStar 100s linear infinite;

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
  //animation: animStar 50s linear infinite;

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

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-100vh);
  }
}
</style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
