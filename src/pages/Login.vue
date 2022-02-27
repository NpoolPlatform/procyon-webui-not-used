<template>
  <LoginBox :title="$t('login.Title')" :always-selectable="true">
    <LoginForm />
  </LoginBox>

  <q-dialog v-model='showVerify'>
    <CodeVerifier v-model:verify-by='verifyBy' v-model:verify-code='verifyCode' @verify='onVerify' />
  </q-dialog>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, ref, watch, onMounted } from 'vue'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/users/mutation-types'
import { useRouter } from 'vue-router'
import { ActionTypes, ActionTypes as verifyAction } from 'src/store/verify/action-types'
import {
  SendEmailCodeRequest,
  VerifyEmailCodeRequest,
  VerifyGoogleAuthenticationCodeRequest
} from 'src/store/verify/types'
import { useI18n } from 'vue-i18n'
import { GenerateSendEmailRequest, loginVeiryConfirm, ThrottleDelay } from 'src/utils/utils'
import { throttle, useQuasar } from 'quasar'
import { ActionTypes as ApplicationActionTypes } from 'src/store/application/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { AppID } from 'src/const/const'
import { VerifyMethod } from 'src/store/users/const'

const store = useStore()
const router = useRouter()

const q = useQuasar()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const { locale } = useI18n({ useScope: 'global' })

const LoginBox = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const LoginForm = defineAsyncComponent(() => import('src/components/form/LoginForm.vue'))
const CodeVerifier = defineAsyncComponent(() => import('src/components/dialog/popupverify/CodeVerifier.vue'))

const verifyBy = ref(VerifyMethod.VerifyNone)
const verifyCode = ref('')
const showVerify = ref(false)
watch(verifyBy, () => {
  showVerify.value = verifyBy.value !== VerifyMethod.VerifyNone
})

const logined = computed({
  get: () => store.getters.getUserLogined,
  set: (val) => {
    store.commit(MutationTypes.SetUserLogined, val)
  }
})

const loginVerify = computed({
  get: () => store.getters.getLoginVerify,
  set: (val) => {
    store.commit(MutationTypes.SetLoginVerify, val)
  }
})
const userInfo = computed(() => store.getters.getUserInfo)
const application = computed(() => store.getters.getApplication)

const langID = computed(() => {
  let id = ''
  store.getters.getLanguages.forEach((lang) => {
    if (locale.value === lang.Lang) {
      id = lang.ID
    }
  })
  return id
})

watch(logined, () => {
  if (!application.value.Ctrl || !application.value.Ctrl?.SigninVerifyEnable) {
    q.cookies.set(loginVeiryConfirm, 'true')
    logined.value = true
    loginVerify.value = true
    void router.push({ path: '/dashboard' })
    return
  }

  if (logined.value) {
    if (userInfo.value.Ctrl &&
      userInfo.value.Ctrl.SigninVerifyByGoogleAuthentication &&
      userInfo.value.Ctrl.GoogleAuthenticationVerified) {
      verifyBy.value = VerifyMethod.VerifyByGoogle
    } else if (userInfo.value.User.EmailAddress &&
      userInfo.value.User.EmailAddress?.length > 0) {
      let request: SendEmailCodeRequest = {
        EmailAddress: userInfo.value.User.EmailAddress,
        LangID: langID.value,
        UsedFor: 'SIGNIN'
      }
      request = GenerateSendEmailRequest(locale.value, userInfo.value, request)
      store.dispatch(verifyAction.SendEmail, request)
      verifyBy.value = VerifyMethod.VerifyByEmail
    } else {
      q.cookies.set(loginVeiryConfirm, 'true')
      logined.value = true
      loginVerify.value = true
      void router.push({ path: '/dashboard' })
    }
  }
})

const verifyEmailCode = throttle((verifyCode: string): void => {
  const request: VerifyEmailCodeRequest = {
    UsedFor: 'SIGNIN',
    Code: verifyCode
  }
  store.dispatch(ActionTypes.VerifyEmailCode, request)
}, ThrottleDelay)

const verifyGoogleCode = throttle((verifyCode: string): void => {
  const request: VerifyGoogleAuthenticationCodeRequest = {
    Code: verifyCode
  }
  store.dispatch(ActionTypes.VerifyGoogleAuthentication, request)
}, ThrottleDelay)

const onVerify = throttle((verifyCode: string): void => {
  if (verifyBy.value === VerifyMethod.VerifyByGoogle) {
    verifyGoogleCode(verifyCode)
  } else if (verifyBy.value === VerifyMethod.VerifyByEmail) {
    verifyEmailCode(verifyCode)
  }
}, ThrottleDelay)

watch(loginVerify, () => {
  verifyBy.value = VerifyMethod.VerifyNone
  void router.push({ path: '/dashboard' })
})

onMounted(() => {
  store.dispatch(ApplicationActionTypes.GetApplication, {
    ID: AppID,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_APP_LANG_INFOS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

</script>
