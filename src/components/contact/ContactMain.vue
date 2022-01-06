<template>
  <div>
    <h2 class='section-part-title'>{{$t('contact.Title')}}</h2>
    <div class='contact-page'>
      <ContactLeft />
      <ContactRight />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const ContactLeft = defineAsyncComponent(() => import('./contact-left/ContactLeft.vue'))
const ContactRight = defineAsyncComponent(() => import('./contact-right/ContactRight.vue'))
</script>

<style scoped>
.contact-page {
  display: flex;
  flex-wrap: wrap;
}
</style>
