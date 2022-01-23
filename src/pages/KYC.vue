<template>
  <div class='content'>
    <div class='section-part-title'>{{ $t('general.KYCStatus') }}</div>
    <KYCState :state='kycState' />
    <div class='section-part-title'>{{ $t('general.KYCImages') }}</div>
    <KYCDocuments :kyc-info='kycInfo' />
  </div>
</template>

<script setup lang='ts'>
import { onMounted, computed, defineAsyncComponent } from 'vue'
import { CheckLogined } from 'src/utils/utils'
import { useStore } from 'src/store'
import { ActionTypes as KYCActionTypes } from 'src/store/kycs/action-types'
import { State } from 'src/store/kycs/const'
import { MutationTypes as KYCMutationTypes } from 'src/store/kycs/mutation-types'

const KYCState = defineAsyncComponent(() => import('src/components/kyc/KYCState.vue'))
const KYCDocuments = defineAsyncComponent(() => import('src/components/kyc/KYCDocuments.vue'))

const store = useStore()

const kycInfo = computed(() => store.getters.getKYCInfo)
const kycState = computed(() => {
  return kycInfo.value ? kycInfo.value.State : State.NotVerified
})

onMounted(() => {
  if (CheckLogined()) {
    store.commit(KYCMutationTypes.SetLocalKYCFrontImage, {})
    store.commit(KYCMutationTypes.SetLocalKYCBackImage, {})
    store.commit(KYCMutationTypes.SetLocalKYCHandingImage, {})
    store.dispatch(KYCActionTypes.GetKYCInfo)
  }
})

</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px 72px 72px;
  padding: 0 24px;
}
</style>
