<template>
  <LoginBox :title="$t('login.Title')">
    <LoginForm />
  </LoginBox>

  <VerifyDialog :dialog-title="$t('dialog.EmailVerify.Title')" v-model:show-dialog='showEmailVerifyDialog'
                @verify='verifyEmailCode'>
    <template v-slot:content>
      <q-card-section>
        {{ $t('dialog.EmailVerify.Content1')
        }}<span style='font-weight: bolder'>{{ userInfo.UserBasicInfo.EmailAddress
        }}</span>,{{ $t('dialog.EmailVerify.Content3')
        }}
      </q-card-section>
    </template>

    <template v-slot:email-input>
      <q-input
        disable
        bg-color='blue-grey-2'
        class='common-input'
        outlined
        :label='$t("input.EmailAddress")'
        v-model='userInfo.UserBasicInfo.EmailAddress'>
      </q-input>
    </template>
  </VerifyDialog>
  <VerifyDialog :dialog-title="$t('dialog.GoogleVerify.Title')"
                v-model:show-dialog='showGoogleAuthenticationVerifyDialog' @verify='verifyGoogleCode'>
    <template v-slot:content>
      <div>{{ $t('login.GoogleVerifyContent') }}</div>
    </template>
  </VerifyDialog>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, ref, watch, onMounted, onUnmounted } from 'vue'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/users/mutation-types'
import { useRouter } from 'vue-router'
import { ActionTypes, ActionTypes as verifyAction } from 'src/store/verify/action-types'
import {
  SendEmailRequest,
  VerifyCodeWithUserIDRequest,
  VerifyGoogleAuthenticationCodeRequest
} from 'src/store/verify/types'
import { useI18n } from 'vue-i18n'
import { RequestInput } from 'src/store/types'
import { GenerateSendEmailRequest, ThrottleDelay } from 'src/utils/utils'
import { throttle, useQuasar } from 'quasar'
import { UserLogoutRequest } from 'src/store/users/types'
import { ActionTypes as userAction } from 'src/store/users/action-types'

const store = useStore()
const router = useRouter()
// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/unbound-method
const {
  t,
  locale
} = useI18n({ useScope: 'global' })

const LoginBox = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const LoginForm = defineAsyncComponent(() => import('src/components/form/LoginForm.vue'))
const VerifyDialog = defineAsyncComponent(() => import('src/components/dialog/login-verify/VerifyDialog.vue'))

const showGoogleAuthenticationVerifyDialog = ref(false)
const showEmailVerifyDialog = ref(false)

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

watch(logined, (newLogined, oldLogined) => {
  if (newLogined && !oldLogined) {
    if (userInfo.value.UserAppInfo.UserApplicationInfo.GALogin) {
      showGoogleAuthenticationVerifyDialog.value = true
    } else if (userInfo.value.UserBasicInfo.EmailAddress !== '') {
      const request: SendEmailRequest = {
        Email: userInfo.value.UserBasicInfo.EmailAddress,
        Lang: locale.value
      }
      let sendEmailRequest: RequestInput<SendEmailRequest> = {
        requestInput: request,
        messages: {
          successMessage: t('notify.SendEmail.Success.Words1') + '<' + userInfo.value.UserBasicInfo.EmailAddress + '>' + t('notify.SendEmail.Success.Words2') + t('notify.SendEmail.Success.Check'),
          failMessage: t('notify.SendEmail.Fail')
        },
        loadingContent: t('notify.SendEmail.Load')
      }
      sendEmailRequest = GenerateSendEmailRequest(locale.value, userInfo.value.UserBasicInfo, sendEmailRequest)
      store.dispatch(verifyAction.SendEmail, sendEmailRequest)
      showEmailVerifyDialog.value = true
    } else {
      logined.value = true
      loginVerify.value = true
      void router.push({ path: '/account' })
    }
  }
})

const verifyEmailCode = throttle((verifyCode: string): void => {
  const request: VerifyCodeWithUserIDRequest = {
    UserID: '',
    Param: userInfo.value.UserBasicInfo.EmailAddress,
    Code: verifyCode
  }
  const verifyCodeWithUserIDRequest: RequestInput<VerifyCodeWithUserIDRequest> = {
    requestInput: request,
    messages: {
      successMessage: t('notify.VerifyWithUserID.Success'),
      failMessage: t('notify.VerifyWithUserID.Fail')
    },
    loadingContent: t('notify.VerifyWithUserID.Load')
  }
  store.dispatch(ActionTypes.VerifyCodeWithUserID, verifyCodeWithUserIDRequest)
}, ThrottleDelay)

const verifyGoogleCode = throttle((verifyCode: string): void => {
  const request: VerifyGoogleAuthenticationCodeRequest = {
    UserID: '',
    Code: verifyCode
  }
  const verifyGoogleAuthenticationCodeRequest: RequestInput<VerifyGoogleAuthenticationCodeRequest> = {
    requestInput: request,
    messages: {
      successMessage: t('notify.VerifyGoogleAuthentication.Success'),
      failMessage: t('notify.VerifyGoogleAuthentication.Fail')
    },
    loadingContent: t('notify.VerifyGoogleAuthentication.Load')
  }
  store.dispatch(ActionTypes.VerifyGoogleAuthentication, verifyGoogleAuthenticationCodeRequest)
}, ThrottleDelay)

const q = useQuasar()

const logoutUser = () => {
  if (!loginVerify.value && !logined.value && q.cookies.has('UserID') && q.cookies.has('AppSession')) {
    const request: UserLogoutRequest = {}
    const userLogoutRequest: RequestInput<UserLogoutRequest> = {
      requestInput: request,
      messages: {
        successMessage: '',
        failMessage: ''
      },
      loadingContent: ''
    }
    store.dispatch(userAction.UserLogout, userLogoutRequest)
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', e => {
    console.log('leave', e)
    logoutUser()
  })
})

onUnmounted(() => {
  console.log('leave')
  logoutUser()
  window.removeEventListener('beforeunload', (e) => {
    console.log(e)
    logoutUser()
  })
})
</script>
