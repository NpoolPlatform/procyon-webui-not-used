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
import MainHeader from 'src/components/header/Header.vue'

const store = useStore()

const fontStyle = computed(() => store.getters.getFontStyle)
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap");
.main-body {
  background-image: url("../assets/procyon-logo-opacity0.025.svg");
  background-position: 90% -360px;
  background-repeat: no-repeat;
  background-size: 800px;
  display: block;
  top: 100;
  right: 0;
  height: auto;
  width: 100%;
}
</style>
