<template>
  <div class='content' style='margin-left: 20px;'>
    <div class='section-part-title'>{{ $t('affiliate.Title') }}</div>
    <AffiliateTree />
  </div>
</template>

<script setup lang='ts'>
import { computed, onBeforeMount, defineAsyncComponent, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'
import { CheckLogined } from 'src/utils/utils'
import { GetUserInvitationCodeRequest } from 'src/store/users/types'
import { ActionTypes } from 'src/store/users/action-types'

const AffiliateTree = defineAsyncComponent(() => import('src/components/affiliate/AffilicateTree.vue'))

const router = useRouter()

const store = useStore()
const userInvitationCode = computed(() => store.getters.getUserInvitationCode)

const getUserInvitationCode = () => {
  const request: GetUserInvitationCodeRequest = {}
  store.dispatch(ActionTypes.GetUserInvitationCode, request)
}

onBeforeMount(() => {
  getUserInvitationCode()
})

onMounted(() => {
  CheckLogined()
  if (userInvitationCode.value === '') {
    console.log('invitation code is: ', userInvitationCode.value)
    void router.push('/')
  }
})
</script>

<style scoped>
</style>
