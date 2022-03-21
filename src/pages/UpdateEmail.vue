<template>
  <BackConfirm>
    <Box :dense='true' :title="$t('account.Setting.Email.UpdateButton')" :always-selectable="false" :show-link="false">
      <UpdateEmail />
    </Box>
  </BackConfirm>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const Box = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const BackConfirm = defineAsyncComponent(() => import('src/components/page/BackConfirm.vue'))
const UpdateEmail = defineAsyncComponent(() => import('components/dialog/setting/UpdateEmail.vue'))

</script>

<style scoped>
</style>
