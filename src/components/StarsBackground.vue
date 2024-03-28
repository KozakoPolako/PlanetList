<template>
  <div id="background">
    <div id="background-container">
      <div id="stars-box">
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StarsBackground",
  data() {
    return {
      screenSize: {
        width: window.screen.width,
        height: window.screen.height
      }
    };
  },
  watch: {
    screenSize: {
      handler(val) {}
    }
  },
  created() {},

  methods: {}
});
</script>

<style lang="scss" scoped>
@use "sass:math";
$stars_width: 2560;
$stars_height: 10000;

@debug calc(100vh);

@function multiple-box-shadow($n) {
  $value: "#{math.random($stars_width)}px #{math.random($stars_height)}px #FFF";
  @for $i from 2 through $n {
    $value: "#{$value} , #{math.random($stars_width)}px #{math.random($stars_height)}px #FFF";
  }

  @return unquote($value);
}

$shadows-small: multiple-box-shadow(math.ceil($stars_width * 0.5));
$shadows-medium: multiple-box-shadow(math.ceil($stars_width * 0.2));
$shadows-big: multiple-box-shadow(math.ceil($stars_width * 0.1));

#background-container {
  display: flex;
  justify-content: center;
}

:global(#background) {
  height: 100vh;
  width: 100vw;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
}

#stars-box {
  width: ($stars_width) + px;
}

#stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: $shadows-small;
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
