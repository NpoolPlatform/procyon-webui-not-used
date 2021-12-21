<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, toRef } from 'vue'
interface Props {
  title: string
  caption: string
  link: string
  icon: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  caption: '',
  link: '#',
  icon: ''
})

const title = toRef(props, 'title')
const caption = toRef(props, 'caption')
const link = toRef(props, 'link')
const icon = toRef(props, 'icon')
</script>
