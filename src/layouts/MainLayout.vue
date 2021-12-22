<template>
  <q-layout class="main-body" :style="fontStyle">
    <q-header reveal class="page-header">
      <main-header></main-header>
    </q-header>

    <q-drawer
      :width="200"
      v-model="showDrawer"
      style="background: transparent !important"
    >
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
import { computed, ref } from 'vue'
import { useStore } from 'src/store/index'
import MainHeader from 'src/components/header/Header.vue'
import MainDrawer from 'src/components/drawer/MainDrawer.vue'

const store = useStore()
const showDrawer = ref(true)

const fontStyle = computed(() => store.getters.getFontStyle)
</script>

<style scoped>
.main-body {
  background-image: url('../assets/procyon-logo-opacity0.025.svg');
  background-position: 90% -360px;
  background-repeat: no-repeat;
  background-size: 800px;
  display: block;
  top: 100;
  right: 0;
  height: auto;
  width: 100%;
}

.page-header {
  background: none;
  height: 100px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
}

.q-drawer-container >>> .q-drawer {
  background: none;
}
</style>
