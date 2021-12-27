<template>
  <q-input bg-color='blue-grey-2' :label="$t('input.VerifyCode')" outlined v-model='code'
           class='common-input' lazy-rules :rules='codeRules'>
    <template v-slot:append>
      <q-btn
        v-if="verifyType === 'email'"
        flat
        rounded
        :disable='sendDisable'
        @click='sendEmailCode'
      >
        {{ sendCodeText }}
      </q-btn
      >
      <q-btn
        v-if="verifyType === 'phone'"
        flat
        rounded
        :disable='sendDisable'
        @click='sendPhoneCode'
      >
        {{ sendCodeText }}
      </q-btn
      >
    </template>
  </q-input>
</template>

<script setup lang='ts'>
import { ref, defineProps, withDefaults, defineEmits, toRef, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/verify/mutation-types'

const store = useStore()

interface Props {
  email: string
  verifyCode: string
  verifyType: string
}

const props = withDefaults(defineProps<Props>(), {
  email: '',
  verifyCode: '',
  verifyType: 'email'
})
const email = toRef(props, 'email')
const code = toRef(props, 'verifyCode')
const verifyType = toRef(props, 'verifyType')

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

defineEmits<{ (e: 'update:code', value: string): void }>()

const codeRules = ref([
  (val: string) => (val && val.length > 0) || t('input.VerifyCodeWarning')
])

const sendDisable = computed(() => store.getters.getVerifySendCodeButtonDisable)
const sendCodeText = computed({
  get: () => store.getters.getVerifySendCodeButtonText,
  set: (val) => {
    store.commit(MutationTypes.SetSendCodeButtonText, val)
  }
})

const sendEmailCode = () => {

}

watch(sendDisable, (n) => {
  if (!n) {
    sendCodeText.value = t('button.SendCode')
  }
})

onMounted(() => {
  sendCodeText.value = t('button.SendCode')
})
</script>

<style scoped>
</style>
