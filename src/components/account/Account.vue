<template>
  <div class='content'>
    <div>
      <div class='section-part-title'>{{ $t('account.Title') }}</div>
      <PersonDetails />
    </div>
    <div>
      <div class='section-part-title'>{{ $t('account.Setting.Title') }}</div>
      <SecuritySettings />
    </div>

    <div style='margin-bottom: 20px'>
      <div class='section-part-title'>{{$t('account.History.Title')}}</div>
      <LoginHistoryTable />
    </div>

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

const PersonDetails = defineAsyncComponent(() => import('src/components/account/detail/PersonDetails.vue'))
const SecuritySettings = defineAsyncComponent(() => import('src/components/account/settings/SecuritySettings.vue'))
const LoginHistoryTable = defineAsyncComponent(() => import('src/components/table/LoginHistory.vue'))

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
  getUserDetail()
  getUserGoogleAuthenticatorInfo()
})

</script>

<style scoped>
.earn-box {
  display: flex;
  justify-content: center;
}

.earn-box-item {
  display: flex;
  flex-direction: column;
  padding: 0 36px;
  text-align: center;
  min-width: 240px;
  width: 30%;
}

.price {
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
}

.subtitle {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 12px 0;
}
</style>
