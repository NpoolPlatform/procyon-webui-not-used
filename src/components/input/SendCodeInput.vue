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
import { MutationTypes } from 'src/store/verify/mutation-types'
import { SendEmailRequest, SendSmsRequest } from 'src/store/verify/types'
import { RequestInput } from 'src/store/types'
import { GenerateSendEmailRequest } from 'src/utils/utils'
import { ActionTypes } from 'src/store/verify/action-types'

const store = useStore()

interface Props {
  verifyParam: string
  verifyType: string
}

const props = withDefaults(defineProps<Props>(), {
  verifyParam: '',
  verifyType: 'email'
})
const verifyParam = toRef(props, 'verifyParam')
const verifyType = toRef(props, 'verifyType')
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

const sendDisable = computed(() => store.getters.getVerifySendCodeButtonDisable)
const sendCodeText = computed({
  get: () => store.getters.getVerifySendCodeButtonText,
  set: (val) => {
    store.commit(MutationTypes.SetSendCodeButtonText, val)
  }
})
const userBasicInfo = computed(() => store.getters.getUserBasicInfo)

const sendEmailCode = () => {
  const successMessage = t('notify.SendEmail.Success.Words1') +
    ' <' +
    verifyParam.value +
    '>, ' +
    t('notify.SendEmail.Success.Words2') +
    t('notify.SendEmail.Success.Check')

  const request: SendEmailRequest = {
    Email: verifyParam.value,
    Lang: locale.value
  }
  let sendEmailRequest: RequestInput<SendEmailRequest> = {
    requestInput: request,
    messages: {
      successMessage: successMessage,
      failMessage: t('notify.SendEmail.Fail')
    },
    loadingContent: t('notify.SendEmail.Load')
  }
  sendEmailRequest = GenerateSendEmailRequest(locale.value, userBasicInfo.value, sendEmailRequest)
  store.dispatch(ActionTypes.SendEmail, sendEmailRequest)
}

const sendSmsCode = () => {
  const successMessage = t('notify.SendPhone.Success.Words1') +
    ' <' +
    verifyParam.value +
    '>, ' +
    t('notify.SendPhone.Success.Words2') +
    t('notify.SendPhone.Success.Check')
  const request: SendSmsRequest = {
    Lang: locale.value,
    Phone: verifyParam.value
  }
  const sendSmsRequest: RequestInput<SendSmsRequest> = {
    requestInput: request,
    messages: {
      successMessage: successMessage,
      failMessage: t('notify.SendPhone.Fail')
    },
    loadingContent: t('notify.SendPhone.Load')
  }
  store.dispatch(ActionTypes.SendSMS, sendSmsRequest)
}

watch(sendDisable, (n, o) => {
  if (!n && o) {
    sendCodeText.value = t('button.SendCode')
  }
})

onMounted(() => {
  sendCodeText.value = t('button.SendCode')
})
</script>

<style scoped>
</style>
