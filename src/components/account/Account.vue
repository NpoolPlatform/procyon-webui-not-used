<template>
  <div class='content'>
    <div>
      <div class='section-part-title'>{{ $t('account.Title') }}</div>
      <PersonDetails />
    </div>
    <div style='margin-bottom: 20px'>
      <div class='section-part-title'>{{$t('account.History.Title')}}</div>
      <LoginHistoryTable />
    </div>

    <div class='hr' />
  </div>
</template>

<script setup lang='ts'>
import { defineAsyncComponent, onMounted } from 'vue'
import { GetUserDetailRequest } from 'src/store/users/types'
import { ActionTypes } from 'src/store/users/action-types'
import { useStore } from 'src/store'

const PersonDetails = defineAsyncComponent(() => import('src/components/account/detail/PersonDetails.vue'))
const LoginHistoryTable = defineAsyncComponent(() => import('src/components/table/LoginHistory.vue'))

const store = useStore()

const getUserDetail = () => {
  const request: GetUserDetailRequest = {}
  store.dispatch(ActionTypes.GetUserDetail, request)
}

onMounted(() => {
  getUserDetail()
})

</script>

<style scoped>
</style>
