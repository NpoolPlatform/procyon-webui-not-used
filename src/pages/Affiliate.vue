<template>
  <div class='content'>
    <div class='section-part-title'>{{ $t('affiliate.ReferralCode') }}</div>
    <ReferralCode />
    <div class='hr' />
    <div class='section-part-title'>{{ $t('affiliate.Title') }}</div>
    <AffiliateTree />
    <div class='hr' />
    <div class='section-part-title'>{{$t('affiliate.Direct.Title')}}</div>
    <AffiliateTable />
    <div class='section-part-title'>{{$t('affiliate.Export.Title')}}</div>
    <q-btn flat class='common-button export-button' :label="$t('affiliate.Export.Button')" disable></q-btn>
    <div class='hr' />
  </div>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const AffiliateTree = defineAsyncComponent(() => import('src/components/affiliate/AffilicateTree.vue'))
const ReferralCode = defineAsyncComponent(() => import('src/components/affiliate/ReferralCode.vue'))
const AffiliateTable = defineAsyncComponent(() => import('src/components/affiliate/AffiliateTable.vue'))

</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px;
  padding: 0 24px;
}

.export-button {
  border: 1px solid #ff964a;
  color: #ff964a;;
  text-shadow: 1px 1px 1px #27424c;
  width: 250px;
  height: 40px;
}
</style>
