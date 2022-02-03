<template>
  <Account />
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const Account = defineAsyncComponent(() => import('src/components/account/Account.vue'))

</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px;
  padding: 0 24px;
}
</style>
