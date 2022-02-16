<template>
  <div class='content'>
    <div>
      <div class='section-part-title'>{{ $t('MSG_ACCOUNT_BALANCE') }}</div>
      <BalanceBox />
    </div>
    <div class='hr-t'></div>
    <div>
      <div class='section-part-title row'>
        {{ $t('MSG_ASSETS') }}
        <q-space />
        <q-btn disable flat class='common-button export-button l-section-part-title'>
          {{ $t('MSG_EXPORT_HISTORY') }}
        </q-btn>
      </div>
      <AssetTable />
    </div>
    <div class='hr-t'></div>
    <div>
      <div class='section-part-title row'>{{ $t('MSG_TRANSACTIONS') }}</div>
      <TransactionTable />
    </div>
    <div class='hr-t'></div>
    <div>
      <div class='section-part-title row'>{{ $t('MSG_APPROVED_ADDRESSES') }}</div>
      <ApprovedAddressTable />
    </div>
    <div class='hr-t'></div>
  </div>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { useStore } from 'src/store'
import { ActionTypes as OrderActionTypes } from 'src/store/orders/action-types'
import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ActionTypes as BenefitActionTypes } from 'src/store/benefits/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'

const BalanceBox = defineAsyncComponent(() => import('src/components/wallet/BalanceBox.vue'))
const AssetTable = defineAsyncComponent(() => import('src/components/wallet/AssetTable.vue'))
const TransactionTable = defineAsyncComponent(() => import('components/wallet/TransactionTable.vue'))
const ApprovedAddressTable = defineAsyncComponent(() => import('src/components/wallet/ApprovedAddressTable.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const orders = computed(() => store.getters.getOrders)
const goods = computed(() => store.getters.getGoods)
const benefits = computed(() => store.getters.getBenefits)

onMounted(() => {
  if (!orders.value || orders.value.length === 0) {
    store.dispatch(OrderActionTypes.GetOrders, {})
  }
  if (!goods.value || goods.value.length === 0) {
    store.dispatch(GoodActionTypes.GetGoods, {
      Message: {
        ModuleKey: ModuleKey.ModuleApplications,
        Error: {
          Title: t('MSG_GET_GOODS_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  }
  if (!benefits.value || benefits.value.length === 0) {
    store.dispatch(BenefitActionTypes.GetUserBenefitsByAppUser, {
      Message: {
        ModuleKey: ModuleKey.ModuleApplications,
        Error: {
          Title: t('MSG_GET_BENEFITS_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  }
})
</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px;
  padding: 0 24px;
}

.export-button {
  border: 1px solid #ff964a;
  color: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  text-shadow: 1px 1px 1px #27424c;
  height: 36px;
  line-height: 20px;
  border-radius: 12px;
  margin-right: 24px;
  margin-top: 5px;
  margin-bottom: 3px;
  -webkit-text-fill-color: none
}

.l-section-part-title {
  -webkit-text-fill-color: #ff964a;
}
</style>
