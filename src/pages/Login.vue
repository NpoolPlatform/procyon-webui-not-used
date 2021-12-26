<template>
  <LoginBox :title="$t('login.Title')">
    <LoginForm></LoginForm>
  </LoginBox>
</template>

<script setup lang='ts'>
import { defineAsyncComponent, computed, watch, ref } from 'vue'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/users/mutation-types'
import { useRouter } from 'vue-router'
import { ActionTypes } from 'src/store/users/action-types'
import { GetUserInvitationCodeRequest } from 'src/store/users/types'
import { ActionTypes as verifyAction } from 'src/store/verify/action-types'
import { SendEmailRequest } from 'src/store/verify/types'
import { useI18n } from 'vue-i18n'
import { RequestInput } from 'src/store/types'

const store = useStore()
const router = useRouter()
// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/unbound-method
const {
  t,
  locale
} = useI18n({ useScope: 'global' })

const LoginBox = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const LoginForm = defineAsyncComponent(() => import('src/components/form/LoginForm.vue'))

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
      // todo: send email verify code
      let username = ''
      if (locale.value === 'en-US') {
        if (userInfo.value.UserBasicInfo.FirstName !== '') {
          username = userInfo.value.UserBasicInfo.FirstName
        }
      } else {
        if (userInfo.value.UserBasicInfo.LastName !== '') {
          username = userInfo.value.UserBasicInfo.LastName
        }
      }
      const request: SendEmailRequest = {
        AppID: '',
        Email: userInfo.value.UserBasicInfo.EmailAddress,
        Intention: '',
        Lang: locale.value,
        Username: username
      }

      const sendEmailRequest: RequestInput<SendEmailRequest> = {
        requestInput: request,
        messages: {
          loadingMessage: t('notify.SendEmail.Load'),
          successMessage: t('notify.SendEmail.Success.Word1') + '<' + userInfo.value.UserBasicInfo.EmailAddress + '>' + t('notify.SendEmail.Success.Word2') + t('notify.SendEmail.Success.Check'),
          failMessage: t('notify.SendEmail.Fail')
        }
      }
      store.dispatch(verifyAction.SendEmail, sendEmailRequest)
      showEmailVerifyDialog.value = true
    } else {
      const request: GetUserInvitationCodeRequest = {
        AppID: '',
        UserID: ''
      }
      store.dispatch(ActionTypes.GetUserInvitationCode, request)
      logined.value = true
      void router.push({ path: '/account' })
    }
  }
})
</script>
