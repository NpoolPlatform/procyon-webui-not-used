<template>
  <LoginBox :title="$t('login.Title')">
    <LoginForm></LoginForm>
  </LoginBox>

  <EmailVerifyDialog v-model:show-email='showEmailVerifyDialog'></EmailVerifyDialog>
  <GoogleVerifyDialog v-model:show-google='showGoogleAuthenticationVerifyDialog'></GoogleVerifyDialog>
</template>

<script setup lang='ts'>
import { defineAsyncComponent, computed, watch, ref } from 'vue'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/users/mutation-types'
import { useRouter } from 'vue-router'
import { ActionTypes as verifyAction } from 'src/store/verify/action-types'
import { SendEmailRequest } from 'src/store/verify/types'
import { useI18n } from 'vue-i18n'
import { RequestInput } from 'src/store/types'
import { GenerateSendEmailRequest } from 'src/utils/utils'

const store = useStore()
const router = useRouter()
// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/unbound-method
const {
  t,
  locale
} = useI18n({ useScope: 'global' })

const LoginBox = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const LoginForm = defineAsyncComponent(() => import('src/components/form/LoginForm.vue'))
const EmailVerifyDialog = defineAsyncComponent(() => import('src/components/dialog/login-verify/EmailVerify.vue'))
const GoogleVerifyDialog = defineAsyncComponent(() => import('src/components/dialog/login-verify/GoogleVerify.vue'))

const showGoogleAuthenticationVerifyDialog = ref(false)
const showEmailVerifyDialog = ref(false)

const logined = computed({
  get: () => store.getters.getUserLogined,
  set: (val) => store.commit(MutationTypes.SetUserLogined, val)
})
const userInfo = computed(() => store.getters.getUserInfo)

watch(logined, (newLogined) => {
  if (newLogined) {
    if (userInfo.value.UserAppInfo.UserApplicationInfo.GALogin) {
      showGoogleAuthenticationVerifyDialog.value = true
    } else if (userInfo.value.UserBasicInfo.EmailAddress !== '') {
      const request: SendEmailRequest = {
        Email: userInfo.value.UserBasicInfo.EmailAddress
      }
      let sendEmailRequest: RequestInput<SendEmailRequest> = {
        requestInput: request,
        messages: {
          successMessage: t('notify.SendEmail.Success.Word1') + '<' + userInfo.value.UserBasicInfo.EmailAddress + '>' + t('notify.SendEmail.Success.Word2') + t('notify.SendEmail.Success.Check'),
          failMessage: t('notify.SendEmail.Fail')
        },
        loadingContent: t('notify.SendEmail.Load')
      }
      sendEmailRequest = GenerateSendEmailRequest(locale.value, userInfo.value.UserBasicInfo, sendEmailRequest)
      store.dispatch(verifyAction.SendEmail, sendEmailRequest)
      showEmailVerifyDialog.value = true
    } else {
      logined.value = true
      store.commit(MutationTypes.SetLoginVerify, true)
      void router.push({ path: '/account' })
    }
  }
})
</script>
