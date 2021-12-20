<template>
  <q-layout>
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

<script lang="ts" setup>

</script>

<style scoped></style>
