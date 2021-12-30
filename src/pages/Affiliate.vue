<template>
  <div class='content'>
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
import { RequestInput } from 'src/store/types'
import { ActionTypes } from 'src/store/users/action-types'
import { useI18n } from 'vue-i18n'

const AffiliateTree = defineAsyncComponent(() => import('src/components/affiliate/AffilicateTree.vue'))

const router = useRouter()

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const store = useStore()
const userInvitationCode = computed(() => store.getters.getUserInvitationCode)

const getUserInvitationCode = () => {
  const request: GetUserInvitationCodeRequest = {}
  const getUserInvitationCodeRequest: RequestInput<GetUserInvitationCodeRequest> = {
    requestInput: request,
    messages: {
      successMessage: '',
      failMessage: t('notify.GetUserInvitationCode.Fail')
    },
    loadingContent: ''
  }
  store.dispatch(ActionTypes.GetUserInvitationCode, getUserInvitationCodeRequest)
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
