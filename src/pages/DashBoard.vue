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
      <OrderTable :orders='orders' />
    </div>
    <div class='hr-t'></div>
  </div>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { useStore } from 'src/store'
import { GetOrdersDetailByAppUserRequest } from 'src/store/order/types'
import { ActionTypes } from 'src/store/order/action-types'
import { CheckLogined } from 'src/utils/utils'

const EarnBox = defineAsyncComponent(() => import('src/components/dashboard/EarnBox.vue'))
const MiningSummary = defineAsyncComponent(() => import('src/components/dashboard/MiningSummary.vue'))
const OrderTable = defineAsyncComponent(() => import('components/table/OrderTable.vue'))

const store = useStore()

const orders = computed(() => store.getters.getUserOrderDetails)

const getUserOrders = () => {
  const request: GetOrdersDetailByAppUserRequest = {}
  store.dispatch(ActionTypes.GetUserOrderDetails, request)
}

onMounted(() => {
  if (CheckLogined()) {
    getUserOrders()
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
