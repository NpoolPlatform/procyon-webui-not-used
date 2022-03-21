<template>
  <BackConfirm>
    <Box :dense='true' :title="$t('account.Setting.Phone.UpdateButton')" :always-selectable="false" :show-link="false">
      <UpdateMobile />
    </Box>
  </BackConfirm>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const Box = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const BackConfirm = defineAsyncComponent(() => import('src/components/page/BackConfirm.vue'))
const UpdateMobile = defineAsyncComponent(() => import('components/dialog/setting/UpdatePhone.vue'))

</script>

<style scoped>
</style>
