<template>
  <div class='content'>
    <div>
      <div class='section-part-title'>{{ $t('dashboard.Column1.Title') }}</div>
      <EarnBox />
    </div>
    <div class='hr-t'></div>
    <div>
      <div class='section-part-title'>{{ $t('dashboard.Column2.Title') }}</div>
      <MiningSummary />
    </div>
    <div class='hr-t'></div>
    <div>
      <div class='section-part-title'>{{ $t('dashboard.Column3.Title') }}</div>
      <OrderTable :orders='userOrders' />
    </div>
    <div class='hr-t'></div>
  </div>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { useStore } from 'src/store'
import { ActionTypes as OrderActionTypes } from 'src/store/orders/action-types'
import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'
import { orderToUserOrder } from 'src/store/orders/utils'
import { UserOrder } from 'src/store/orders/types'

const EarnBox = defineAsyncComponent(() => import('src/components/dashboard/EarnBox.vue'))
const MiningSummary = defineAsyncComponent(() => import('src/components/dashboard/MiningSummary.vue'))
const OrderTable = defineAsyncComponent(() => import('components/table/OrderTable.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const orders = computed(() => store.getters.getOrders)
const goods = computed(() => store.getters.getGoods)
const userOrders = computed(() => {
  const myOrders = [] as Array<UserOrder>
  orders.value.forEach((order) => {
    myOrders.push(orderToUserOrder(order))
  })
  return myOrders
})

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
})
</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px;
  padding: 0 24px;
}
</style>
