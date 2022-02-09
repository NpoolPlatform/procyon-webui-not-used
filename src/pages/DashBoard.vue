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
import { GetOrdersByAppUserRequest } from 'src/store/order/types'
import { ActionTypes } from 'src/store/order/action-types'

const EarnBox = defineAsyncComponent(() => import('src/components/dashboard/EarnBox.vue'))
const MiningSummary = defineAsyncComponent(() => import('src/components/dashboard/MiningSummary.vue'))
const OrderTable = defineAsyncComponent(() => import('components/table/OrderTable.vue'))

const store = useStore()

const orders = computed(() => store.getters.getUserOrders)

const getUserOrders = () => {
  const request: GetOrdersByAppUserRequest = {}
  store.dispatch(ActionTypes.GetUserOrders, request)
}

onMounted(() => {
  getUserOrders()
})
</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px;
  padding: 0 24px;
}
</style>
