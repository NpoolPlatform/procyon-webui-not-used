<template>
  <RegisterBox :title="$t('register.Title')">
    <RegisterForm />
  </RegisterBox>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const RegisterBox = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const RegisterForm = defineAsyncComponent(() => import('src/components/form/RegisterForm.vue'))
</script>

<style scoped>
</style>
