<template>
  <div class='content'>
    <div>
      <div class='section-part-title'>{{$t('account.Account.Title')}}</div>
      <PersonDetails />
    </div>
    <div>
      <div></div>
    </div>
    <div>
      <div class='session-pard-title'>{{$t('account.Setting.Title')}}</div>
      <SecuritySettings />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const PersonDetails = defineAsyncComponent(() => import('src/components/account/detail/PersonDetails.vue'))
const SecuritySettings = defineAsyncComponent(() => import('src/components/account/settings/SecuritySettings.vue'))

</script>

<style scoped>
</style>
