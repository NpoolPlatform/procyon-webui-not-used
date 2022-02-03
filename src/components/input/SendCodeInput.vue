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
        {{ t('MSG_SEND_CODE') }}
        <template #loading>
          {{ sendCodeText }}
        </template>
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
        {{ t('MSG_SEND_CODE') }}
        <template #loading>
          {{ sendCodeText }}
        </template>
      </q-btn
      >
    </template>
  </q-input>
</template>

<script setup lang='ts'>
import { computed, defineEmits, defineProps, onMounted, ref, toRef, watch, withDefaults } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { SendEmailCodeRequest, SendSmsRequest } from 'src/store/verify/types'
import { formatPhoneNumber, GenerateSendEmailRequest, isValidEmail, isValidPhone } from 'src/utils/utils'
import { ActionTypes } from 'src/store/verify/action-types'
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

const sendDisable = ref(false)
const innerLoading = ref(false)
const sendCodeText = ref('')
const sendElapsed = ref(0)
const sendTimer = ref()

const userInfo = computed(() => store.getters.getUserInfo)

const langID = computed(() => {
  let id = ''
  store.getters.getLanguages.forEach((lang) => {
    if (locale.value === lang.Lang) {
      id = lang.ID
    }
  })
  return id
})

const counter = () => {
  if (sendTimer.value) {
    clearTimeout(sendTimer.value)
    sendTimer.value = undefined
  }
  if (sendElapsed.value >= 60) {
    innerLoading.value = false
    sendDisable.value = false
    return
  }
  sendElapsed.value += 1
  sendCodeText.value = (60 - sendElapsed.value).toString() + 's'
  sendTimer.value = setInterval(() => counter(), 1000)
}

const sendEmailCode = () => {
  if (!isValidEmail(verifyParam.value)) {
    return
  }
  let request: SendEmailCodeRequest = {
    EmailAddress: verifyParam.value,
    LangID: langID.value,
    UsedFor: 'SIGNUP'
  }
  request = GenerateSendEmailRequest(locale.value, userInfo.value, request)
  store.dispatch(ActionTypes.SendEmail, request)

  sendElapsed.value = 0
  innerLoading.value = true
  sendDisable.value = true

  counter()
}

const sendSmsCode = () => {
  if (!isValidPhone(formatPhoneNumber(verifyParam.value))) {
    return
  }
  const request: SendSmsRequest = {
    Lang: locale.value,
    Phone: formatPhoneNumber(verifyParam.value),
    ItemTarget: itemTarget.value
  }
  store.dispatch(ActionTypes.SendSMS, request)

  sendElapsed.value = 0
  innerLoading.value = true
  sendDisable.value = true

  counter()
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
