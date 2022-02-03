<template>
  <div class='content'>
    <div class='section-part-title'>{{ $t('account.Setting.Title') }}</div>
    <SecuritySettings />
    <div class='hr' />
  </div>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { useStore } from 'src/store'
import { GetQRCodeURLRequest } from 'src/store/verify/types'
import { ActionTypes as verifyAction } from 'src/store/verify/action-types'

const SecuritySettings = defineAsyncComponent(() => import('src/components/security/SecuritySettings.vue'))

const store = useStore()
const userInfo = computed(() => store.getters.getUserInfo)

const getUserGoogleAuthenticatorInfo = () => {
  let username = ''
  if (userInfo.value.User.EmailAddress !== '') {
    username = userInfo.value.User.EmailAddress as string
  } else if (userInfo.value.User.PhoneNO !== '') {
    username = userInfo.value.User.PhoneNO as string
  }
  const request: GetQRCodeURLRequest = {
    Username: username
  }
  store.dispatch(verifyAction.GetQRCodeURL, request)
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
