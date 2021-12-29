<template>
  <router-view />
</template>

<script setup lang='ts'>
import { useQuasar } from 'quasar'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const q = useQuasar()
const $q = useQuasar()

const { locale } = useI18n({ useScope: 'global' })
const router = useRouter()

onMounted(() => {
  if ($q.platform.is.mobile && router.currentRoute.value.path !== '/faq' && router.currentRoute.value.path !== '/legal') {
    void router.push('/notice')
    return
  }
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
})
</script>

<style scoped></style>
