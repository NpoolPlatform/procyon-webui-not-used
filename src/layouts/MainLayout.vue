<template>
  <q-layout class="main-body" :style="fontStyle">
    <q-header reveal>
      <main-header></main-header>
    </q-header>

    <q-drawer>
      <main-drawer></main-drawer>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <main-footer></main-footer>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'src/store/index'

const store = useStore()

const fontStyle = computed(() => store.getters.getFontStyle)
</script>

<style scoped>
*, *::before, *::after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

::selection {
  background: #1ec498;
  color: #27424c;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: #27424c;
}

.main-body {
  background: linear-gradient(
    to bottom right,
    #23292b 0,
    #2a3943 50%,
    #1f293a 100%
  );
  color: #e1eeef;
  font-family: "Barlow", sans-serif;
  font-size: 16px;
  margin: 0;
  min-height: 100%;
  min-width: 600px;
  padding: 0;
  position: relative;
  transition: all ease-in-out 0.1s;
}

.main-body::before {
  background-image: url("../assets/procyon-logo.svg");
  background-position: 90% -360px;
  background-repeat: no-repeat;
  background-size: 800px;
  content: "";
  display: block;
  opacity: 0.025;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: 9999999999;
}
</style>
