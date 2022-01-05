<template>
  <ContactMain class='content' />
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const ContactMain = defineAsyncComponent(() => import('src/components/contact/ContactMain.vue'))
</script>

<style scoped>
</style>
