<template>
  <router-view />
</template>

<script setup lang='ts'>
import { useQuasar } from 'quasar'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/style/mutation-types'

const q = useQuasar()

const { locale } = useI18n({ useScope: 'global' })

const store = useStore()
const fontStyle = computed({
  get: () => store.getters.getFontStyle,
  set: (val) => {
    store.commit(MutationTypes.SetFontStyle, val)
  }
})

onMounted(() => {
  if (q.cookies.has('lang')) {
    locale.value = q.cookies.get('lang')
  } else {
    const lang = q.lang.getLocale()
    if (lang?.indexOf('en')) {
      locale.value = 'en-US'
    } else {
      locale.value = 'ja-JP'
    }
  }
  if (locale.value.indexOf('en')) {
    fontStyle.value = 'font-family: Barlow'
  } else {
    fontStyle.value = 'font-family: "Noto Sans JP"'
  }
})
</script>

<style scoped></style>
