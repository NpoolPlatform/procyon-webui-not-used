<template>
  <div class='content'>
    <div class='section-part-title'>{{ $t('account.Setting.Title') }}</div>
    <SecuritySettings />
    <div class='hr' />
  </div>
</template>

<script setup lang='ts'>
import { defineAsyncComponent, onMounted } from 'vue'
import { useStore } from 'src/store'
import { ActionTypes as verifyAction } from 'src/store/verify/action-types'
import { SetupGoogleAuthenticationRequest } from 'src/store/verify/types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'

const SecuritySettings = defineAsyncComponent(() => import('src/components/security/SecuritySettings.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const getUserGoogleAuthenticatorInfo = () => {
  const request: SetupGoogleAuthenticationRequest = {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_SETUP_GOOGLE_AUTHENTICATION_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  }
  store.dispatch(verifyAction.SetupGoogleAuthentication, request)
}

onMounted(() => {
  getUserGoogleAuthenticatorInfo()
})
</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px;
  padding: 0 24px;
}
</style>
