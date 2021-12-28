<template>
  <div class='content'>
    <div class='section-part-title'>{{$t('Affiliate.Title')}}</div>
    <AffiliateTree />
  </div>
</template>

<script setup lang='ts'>
import { computed, onBeforeMount, defineAsyncComponent } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'

const AffiliateTree = defineAsyncComponent(() => import('src/components/affiliate/AffilicateTree.vue'))

const router = useRouter()

const store = useStore()
const userInvitationCode = computed(() => store.getters.getUserInvitationCode)

onBeforeMount(() => {
  if (userInvitationCode.value === '') {
    void router.push('/')
  }
})
</script>

<style scoped>
</style>
