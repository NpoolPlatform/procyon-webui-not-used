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
      <div class='section-part-title'>{{ $t('Mining.Column3.Title') }}</div>
      <OrderTable :table-columns='orderTableColumns' :table-rows='orders' />
    </div>
    <div class='hr-t'></div>
  </div>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { useStore } from 'src/store'
import { TableColum } from 'src/utils/type'
import { GetOrdersDetailByAppUserRequest, UserOrderDetail } from 'src/store/order/types'
import { useI18n } from 'vue-i18n'
import { RequestInput } from 'src/store/types'
import { ActionTypes } from 'src/store/order/action-types'

const EarnBox = defineAsyncComponent(() => import('src/components/dashboard/EarnBox.vue'))
const MiningSummary = defineAsyncComponent(() => import('src/components/dashboard/MiningSummary.vue'))
const OrderTable = defineAsyncComponent(() => import('src/components/table/Table.vue'))

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const store = useStore()

const orders = computed(() => store.getters.getUserOrderDetails)
const orderTableColumns: Array<TableColum<UserOrderDetail>> = [
  {
    name: 'date',
    label: t('dashboard.Column3.Date'),
    align: 'left',
    field: (row) => row.Date
  },
  {
    name: 'product',
    label: t('dashboard.Column3.Product'),
    align: 'center',
    field: (row) => row.Product
  },
  {
    name: 'amount',
    label: t('dashboard.Column3.Amount'),
    align: 'center',
    field: (row) => row.Amount
  },
  {
    name: 'price',
    label: t('dashboard.Column3.Price'),
    align: 'center',
    field: (row) => row.Price
  },
  {
    name: 'discount',
    label: t('dashboard.Column3.Discount'),
    align: 'center',
    field: (row) => row.Discount
  },
  {
    name: 'techFee',
    label: t('dashboard.Column3.Techfee'),
    align: 'center',
    field: (row) => row.TechFee
  },
  {
    name: 'period',
    label: t('dashboard.Column3.Period'),
    align: 'center',
    field: (row) => (row.Period + t('dashboard.Day')) || t('dashboard.Day')
  },
  {
    name: 'total',
    label: t('dashboard.Column3.Total'),
    align: 'center',
    field: (row) => (row.Total + 'USDT') || 'USDT'
  }
]

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
