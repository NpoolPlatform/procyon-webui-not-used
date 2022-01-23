<template>
  <q-card class='content-glass kyc-status'>
    <div class='row'>
      <img class='kyc-status-img' :src='myState.icon' />
      <span class='status'>{{ myState.label.toUpperCase() }}</span>
    </div>
    <p
      class='rejection-note'
      v-if='kycState === State.Rejected && message'>
      {{ message }}
    </p>
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
const message = toRef(props, 'message')

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
.content-glass {
  background: linear-gradient(to bottom right, rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%);
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 24px;
  margin: 24px;
}

.kyc-status {
  align-items: center;
  flex-wrap: wrap;
  display: flex;
}

.kyc-status img {
  height: 32px;
  margin: 0 8px 0 0;
}

.status {
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
}

.rejection-note {
  margin: 12px 0 0 0;
  width: 100%;
  font-size: 16px;
}
</style>
