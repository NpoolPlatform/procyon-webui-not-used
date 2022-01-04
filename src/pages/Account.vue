<template>
  <Account />
</template>

<script setup lang='ts'>
import { defineAsyncComponent, onMounted } from 'vue'
import { CheckLogined } from 'src/utils/utils'

const Account = defineAsyncComponent(() => import('src/components/account/Account.vue'))

onMounted(() => {
  CheckLogined()
})
</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px;
  padding: 0 24px;
}
</style>
