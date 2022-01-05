<template>
  <div class='content'>
    <div class='section-part-title'>{{ $t('affiliate.ReferralCode') }}</div>
    <ReferralCode />
    <div class='section-part-title'>{{ $t('affiliate.Title') }}</div>
    <AffiliateTree />
  </div>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const AffiliateTree = defineAsyncComponent(() => import('src/components/affiliate/AffilicateTree.vue'))
const ReferralCode = defineAsyncComponent(() => import('src/components/affiliate/ReferralCode.vue'))

</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px;
  padding: 0 24px;
}
</style>
