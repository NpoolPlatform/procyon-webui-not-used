<template>
  <Account />
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const Account = defineAsyncComponent(() => import('src/components/account/Account.vue'))
</script>

<style scoped>
</style>
