<template>
  <router-view />
</template>

<script setup lang='ts'>
import { useQuasar } from 'quasar'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { IsMobile } from 'src/utils/utils'
import { useRouter } from 'vue-router'

const q = useQuasar()

const { locale } = useI18n({ useScope: 'global' })

onMounted(() => {
  const router = useRouter()
  const isMobile = IsMobile()
  if (isMobile) {
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
