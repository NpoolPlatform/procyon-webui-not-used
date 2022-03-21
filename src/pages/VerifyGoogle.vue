<template>
  <BackConfirm>
    <Box :dense='true' :title="$t('account.Setting.Google.Title')" :always-selectable="false" :show-link="false">
      <VerifyGoogle />
    </Box>
  </BackConfirm>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const Box = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const BackConfirm = defineAsyncComponent(() => import('src/components/page/BackConfirm.vue'))
const VerifyGoogle = defineAsyncComponent(() => import('components/dialog/setting/VerifyGoogle.vue'))

</script>

<style lang='sass' scoped>
</style>
