<template>
  <ForgetBox :title="$t('forget.Title')" :always-selectable="true">
    <ForgetForm />
  </ForgetBox>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'
const ForgetBox = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const ForgetForm = defineAsyncComponent(() => import('src/components/form/ForgetPasswordForm.vue'))
</script>

<style scoped>
</style>
