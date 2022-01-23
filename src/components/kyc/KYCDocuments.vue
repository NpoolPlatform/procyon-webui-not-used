<template>
  <q-card class='kyc-bg'>
    <q-item>
      <q-img class='kyc-state-icon' :src='myState.icon' />
      <span class='kyc-state-text'>{{ myState.label.toUpperCase() }}</span>
    </q-item>
  </q-card>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults, toRef, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import kycNotVerifiedImg from 'src/assets/kyc-not-verified.svg'
import kycRejectedImg from 'src/assets/kyc-rejected.svg'
import kycReviewImg from 'src/assets/kyc-review.svg'
import kycVerifiedImg from 'src/assets/kyc-verified.svg'
import { State } from 'src/store/kycs/const'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

interface Props {
  state: State
  message: string
}

const props = withDefaults(defineProps<Props>(), {
  state: State.NotVerified,
  message: ''
})

const kycState = toRef(props, 'state')

interface KYCState {
  label: string
  icon: string
}

const myState = computed(() => {
  switch (kycState.value) {
    case State.NotVerified:
      return {
        label: t('general.NotVerified'),
        icon: kycNotVerifiedImg
      } as KYCState
    case State.Verified:
      return {
        label: t('general.Verified'),
        icon: kycVerifiedImg
      } as KYCState
    case State.Wait:
      return {
        label: t('general.Wait'),
        icon: kycReviewImg
      } as KYCState
    case State.Rejected:
      return {
        label: t('general.Rejected'),
        icon: kycRejectedImg
      } as KYCState
    default:
      return {
        label: t('general.NotVerified'),
        icon: kycNotVerifiedImg
      } as KYCState
  }
})

</script>

<style scoped>
.kyc-bg {
  max-width: 100%;
  background: linear-gradient(to bottom right,rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%);
  margin: 10px;
  padding: 16px 0 16px 10px;
  border-radius: 16px;
}

.kyc-state-icon {
  width: 36px;
  height: 36px;
}

.kyc-state-text {
  line-height: 36px;
  font-size: 24px;
  font-weight: 600;
  margin-left: 10px;
}
</style>
