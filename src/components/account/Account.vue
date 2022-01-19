<template>
  <div class='content'>
    <div>
      <div class='section-part-title'>{{ $t('account.Title') }}</div>
      <PersonDetails />
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
