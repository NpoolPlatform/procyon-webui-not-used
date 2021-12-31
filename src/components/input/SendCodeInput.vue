<template>
  <q-input bg-color='blue-grey-2' :label="$t('input.VerifyCode')" outlined v-model='code'
           class='common-input' lazy-rules :rules='codeRules'>
    <template v-slot:append>
      <q-btn
        v-if="verifyType === 'email'"
        flat
        rounded
        :loading='innerLoading'
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
        :loading='innerLoading'
        :disable='sendDisable'
        @click='sendSmsCode'
      >
        {{ $t('button.SendCode') }}
      </q-btn
      >
    </template>
  </q-input>
</template>

<script setup lang='ts'>
import { computed, defineEmits, defineProps, onMounted, ref, toRef, watch, withDefaults } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { SendEmailRequest, SendSmsRequest } from 'src/store/verify/types'
import { GenerateSendEmailRequest } from 'src/utils/utils'
import { ActionTypes } from 'src/store/verify/action-types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { MutationTypes as verifyMutation } from 'src/store/verify/mutation-types'

const store = useStore()

interface Props {
  verifyParam: string
  verifyType: string
  itemTarget: string
}

const props = withDefaults(defineProps<Props>(), {
  verifyParam: '',
  verifyType: 'email',
  itemTarget: ''
})
const verifyParam = toRef(props, 'verifyParam')
const verifyType = toRef(props, 'verifyType')
const itemTarget = toRef(props, 'itemTarget')
const code = ref('')

// eslint-disable-next-line @typescript-eslint/unbound-method
const {
  t,
  locale
} = useI18n({ useScope: 'global' })

const emit = defineEmits<{(e: 'update:verifyCode', value: string): void }>()

watch(code, (newCode) => {
  emit('update:verifyCode', newCode)
})

const codeRules = ref([
  (val: string) => (val && val.length > 0) || t('input.VerifyCodeWarning')
])

const sendDisable = computed(() => store.getters.getVerifyDisable.get(itemTarget.value))
const innerLoading = computed(() => store.getters.getInnerLoading.get(itemTarget.value))
const sendCodeText = computed(() => store.getters.getVerifySendCodeButtonText.get(itemTarget.value))
const userBasicInfo = computed(() => store.getters.getUserBasicInfo)

const sendEmailCode = () => {
  store.commit(notifyMutation.SetInnerLoading, {
    key: itemTarget.value,
    value: true
  })

  let request: SendEmailRequest = {
    Email: verifyParam.value,
    Lang: locale.value,
    ItemTarget: itemTarget.value
  }
  request = GenerateSendEmailRequest(locale.value, userBasicInfo.value, request)
  store.dispatch(ActionTypes.SendEmail, request)
}

const sendSmsCode = () => {
  store.commit(notifyMutation.SetInnerLoading, {
    key: itemTarget.value,
    value: true
  })
  const request: SendSmsRequest = {
    Lang: locale.value,
    Phone: verifyParam.value,
    ItemTarget: itemTarget.value
  }
  store.dispatch(ActionTypes.SendSMS, request)
}

watch(sendDisable, (n, o) => {
  if (!n && o) {
    store.commit(verifyMutation.SetSendCodeButtonText, {
      key: itemTarget.value,
      value: t('button.SendCode')
    })
  }
})

onMounted(() => {
  store.commit(verifyMutation.SetSendCodeButtonText, {
    key: itemTarget.value,
    value: t('button.SendCode')
  })
})
</script>

<style scoped>
</style>
