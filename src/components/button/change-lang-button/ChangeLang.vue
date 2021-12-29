<template>
  <q-btn-toggle
    v-model="locale"
    push
    glossy
    toggle-color="orange-9"
    @click="changeLang"
    :options="languageOptions"
  />
</template>

<script setup lang="ts">
import { withDefaults, defineProps, toRef } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { MutationTypes } from 'src/store/style/mutation-types'
import { useQuasar } from 'quasar'

interface Props {
  languageOptions?: {label: string, value: string}[]
}

const props = withDefaults(defineProps<Props>(), {
  languageOptions: () => [{ label: 'En', value: 'en-US' }, { label: '日本語', value: 'ja-JP' }]
})

const q = useQuasar()

const languageOptions = toRef(props, 'languageOptions')

const store = useStore()
const { locale } = useI18n({ useScope: 'global' })

const changeLang = () => {
  q.cookies.set('lang', locale.value)
  if (locale.value === 'en-US') {
    store.commit(MutationTypes.SetFontStyle, 'font-family: Barlow')
  } else {
    store.commit(MutationTypes.SetFontStyle, 'font-family: "Noto Sans JP"')
  }
}
</script>
