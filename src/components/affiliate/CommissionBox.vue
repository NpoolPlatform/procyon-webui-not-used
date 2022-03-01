<template>
  <div class='earn-box'>
    <div class='earn-box-item'>
      <div>
        <span class='price'>{{ commission.Total ? commission.Total.toFixed(2) : 0 }}</span>
        <span class='unit'> USDT</span>
      </div>
      <div class='hr sub-hr'></div>
      <span class='subtitle'>{{ $t('MSG_TOTAL') }}</span>
    </div>

    <div class='earn-box-item'>
      <div>
        <span class='price'>{{ commission.Balance ? commission.Balance.toFixed(2) : 0 }}</span>
        <span class='unit'> USDT</span>
      </div>
      <div class='hr sub-hr'></div>
      <span class='subtitle'>{{ $t('MSG_BALANCE') }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue'
import { useStore } from 'src/store'

import { ActionTypes as BenefitActionTypes } from 'src/store/benefits/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const store = useStore()
const commission = computed(() => store.getters.getCommission)

onMounted(() => {
  store.dispatch(BenefitActionTypes.GetCommissionByAppUser, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_COMMISSION_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

</script>

<style scoped>
.earn-box {
  display: flex;
  justify-content: center;
}

.earn-box-item {
  display: flex;
  flex-direction: column;
  padding: 0 36px;
  text-align: center;
  min-width: 240px;
  width: 30%;
}

.price {
  font-size: 36px;
  font-weight: 700;
  text-transform: uppercase;
}

.unit {
  color: #1ec498;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 0 2px;
  text-transform: uppercase;
}

.subtitle {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 12px 0;
}

.sub-hr {
  margin: 0;
}
</style>
