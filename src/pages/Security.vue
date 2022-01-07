<template>
  <div class='content'>
    <div class='section-part-title'>{{ $t('account.Setting.Title') }}</div>
    <SecuritySettings />
    <div class='hr' />
  </div>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { GetUserDetailRequest } from 'src/store/users/types'
import { ActionTypes } from 'src/store/users/action-types'
import { useStore } from 'src/store'
import { GetQRCodeURLRequest } from 'src/store/verify/types'
import { ActionTypes as verifyAction } from 'src/store/verify/action-types'
import { CheckLogined } from 'src/utils/utils'

const SecuritySettings = defineAsyncComponent(() => import('src/components/security/SecuritySettings.vue'))

const store = useStore()
const getUserDetail = () => {
  const request: GetUserDetailRequest = {}
  store.dispatch(ActionTypes.GetUserDetail, request)
}

const userBasicInfo = computed(() => store.getters.getUserBasicInfo)

const getUserGoogleAuthenticatorInfo = () => {
  let username = userBasicInfo.value.Username
  if (userBasicInfo.value.EmailAddress !== '') {
    username = userBasicInfo.value.EmailAddress
  } else if (userBasicInfo.value.PhoneNumber !== '') {
    username = userBasicInfo.value.PhoneNumber
  }
  const request: GetQRCodeURLRequest = {
    Username: username
  }
  store.dispatch(verifyAction.GetQRCodeURL, request)
}

onMounted(() => {
  if (CheckLogined()) {
    getUserDetail()
    getUserGoogleAuthenticatorInfo()
  }
})
</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px;
  padding: 0 24px;
}
</style>
