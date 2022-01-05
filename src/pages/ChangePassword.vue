<template>
  <ChangePasswordBox :title="$t('changePassword.Title')" :always-selectable="false">
    <ChangePasswordForm />
  </ChangePasswordBox>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const ChangePasswordBox = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const ChangePasswordForm = defineAsyncComponent(() => import('src/components/form/ChangePasswordForm.vue'))
</script>

<style scoped>
</style>
