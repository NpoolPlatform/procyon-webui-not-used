<template>
  <LoginBox :title="$t('login.Title')" :always-selectable="true">
    <LoginForm />
  </LoginBox>

  <VerifyDialog :dialog-title="$t('dialog.EmailVerify.Title')" v-model:show-dialog='showEmailVerifyDialog'
                @verify='verifyEmailCode'>
    <template v-slot:content>
      <q-card-section>
        {{ $t('dialog.EmailVerify.Content1')
        }}<span style='font-weight: bolder'>{{ userInfo.User.EmailAddress
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
        v-model='userInfo.User.EmailAddress'>
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

const store = useStore()
const router = useRouter()

const q = useQuasar()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

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

watch(logined, (newLogined, oldLogined) => {
  // TODO: create app control
  if (!application.value.Ctrl || !application.value.Ctrl?.SigninVerifyEnable) {
    q.cookies.set(loginVeiryConfirm, 'true')
    logined.value = true
    loginVerify.value = true
    void router.push({ path: '/dashboard' })
    return
  }

  if (newLogined && !oldLogined) {
    if (userInfo.value.Ctrl &&
      userInfo.value.Ctrl.SigninVerifyByGoogleAuthentication &&
      userInfo.value.Ctrl.GoogleAuthenticationVerified) {
      showGoogleAuthenticationVerifyDialog.value = true
    } else if (userInfo.value.User.EmailAddress &&
      userInfo.value.User.EmailAddress?.length > 0) {
      let request: SendEmailCodeRequest = {
        EmailAddress: userInfo.value.User.EmailAddress,
        LangID: langID.value,
        UsedFor: 'SIGNIN'
      }
      request = GenerateSendEmailRequest(locale.value, userInfo.value, request)
      store.dispatch(verifyAction.SendEmail, request)
      showEmailVerifyDialog.value = true
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
    UserID: '',
    Code: verifyCode
  }
  store.dispatch(ActionTypes.VerifyGoogleAuthentication, request)
}, ThrottleDelay)

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
