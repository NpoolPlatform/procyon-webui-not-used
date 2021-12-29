<template>
  <div class='content'>
    <div class='section-part-title'>{{$t('affiliate.Title')}}</div>
    <AffiliateTree />
  </div>
</template>

<script setup lang='ts'>
import { computed, onBeforeMount, defineAsyncComponent, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'
import { CheckLogined } from 'src/utils/utils'

const AffiliateTree = defineAsyncComponent(() => import('src/components/affiliate/AffilicateTree.vue'))

const router = useRouter()

const store = useStore()
const userInvitationCode = computed(() => store.getters.getUserInvitationCode)

onBeforeMount(() => {
  if (userInvitationCode.value === '') {
    void router.push('/')
  }
})

onMounted(() => {
  CheckLogined()
})
</script>

<style scoped>
</style>
