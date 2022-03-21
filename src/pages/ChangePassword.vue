<template>
  <BackConfirm>
    <ChangePasswordBox :dense='true' :title="$t('changePassword.Title')" :always-selectable="false">
      <ChangePasswordForm />
    </ChangePasswordBox>
  </BackConfirm>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const ChangePasswordBox = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const ChangePasswordForm = defineAsyncComponent(() => import('src/components/form/ChangePasswordForm.vue'))
const BackConfirm = defineAsyncComponent(() => import('src/components/page/BackConfirm.vue'))

</script>

<style scoped>
</style>
