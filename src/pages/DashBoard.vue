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
import { useI18n } from 'vue-i18n'
import { RequestInput } from 'src/store/types'
import { ActionTypes } from 'src/store/order/action-types'

const EarnBox = defineAsyncComponent(() => import('src/components/dashboard/EarnBox.vue'))
const MiningSummary = defineAsyncComponent(() => import('src/components/dashboard/MiningSummary.vue'))
const OrderTable = defineAsyncComponent(() => import('components/table/OrderTable.vue'))

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const store = useStore()

const orders = computed(() => store.getters.getUserOrderDetails)
const getUserOrders = () => {
  const request: GetOrdersDetailByAppUserRequest = {}
  const getOrdersDetailByAppUserRequest: RequestInput<GetOrdersDetailByAppUserRequest> = {
    requestInput: request,
    messages: {
      successMessage: '',
      failMessage: t('notify.GetUserOrders.Fail')
    },
    loadingContent: ''
  }
  store.dispatch(ActionTypes.GetUserOrderDetails, getOrdersDetailByAppUserRequest)
}

onMounted(() => {
  getUserOrders()
})
</script>

<style scoped>
</style>
