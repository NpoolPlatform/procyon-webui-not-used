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
        }}</span>, {{ $t('dialog.EmailVerify.Content3')
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
      <q-card-section>{{ $t('login.GoogleVerifyContent') }}</q-card-section>
    </template>
  </VerifyDialog>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, ref, watch } from 'vue'
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
import { GenerateSendEmailRequest, loginVeiryConfirm, ThrottleDelay } from 'src/utils/utils'
import { throttle, useQuasar } from 'quasar'

const store = useStore()
const router = useRouter()

const q = useQuasar()

const { locale } = useI18n({ useScope: 'global' })

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
    } else if (userInfo.value.UserBasicInfo.EmailAddress !== '' && userInfo.value.UserBasicInfo.EmailAddress !== undefined && userInfo.value.UserBasicInfo.EmailAddress !== null) {
      let request: SendEmailRequest = {
        Email: userInfo.value.UserBasicInfo.EmailAddress,
        Lang: locale.value,
        ItemTarget: ''
      }
      request = GenerateSendEmailRequest(locale.value, userInfo.value.UserBasicInfo, request)
      store.dispatch(verifyAction.SendEmail, request)
      showEmailVerifyDialog.value = true
    } else {
      q.cookies.set(loginVeiryConfirm, 'true')
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
  store.dispatch(ActionTypes.VerifyCodeWithUserID, request)
}, ThrottleDelay)

const verifyGoogleCode = throttle((verifyCode: string): void => {
  const request: VerifyGoogleAuthenticationCodeRequest = {
    UserID: '',
    Code: verifyCode
  }
  store.dispatch(ActionTypes.VerifyGoogleAuthentication, request)
}, ThrottleDelay)
</script>
