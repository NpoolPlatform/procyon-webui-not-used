<template>
  <div class='content'>
    <div>
      <div class='section-part-title'>{{ $t('account.Title') }}</div>
      <PersonDetails />
    </div>
    <div class='hr' />
  </div>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const PersonDetails = defineAsyncComponent(() => import('src/components/account/detail/PersonDetails.vue'))

</script>

<style scoped>
</style>
