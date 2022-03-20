<template>
  <q-table
    flat
    class='table-box'
    :rows='orders'
    :columns='orderTableColumns'
    row-key='ID'
    color='#e1eeef'
    :no-data-label="$t('NoData')"
    :rows-per-page-options='[10, 15, 20, 25]'
    @row-click='(evt, row, index) => onRowClick(row as UserOrder)'
  >
  </q-table>

  <div class='buttons'>
    <q-btn disabled class='common-button export-button'>
      {{ $t('dashboard.Column2.Export') }}
    </q-btn>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, toRef, computed, ref, onMounted, onUnmounted } from 'vue'
import { UserOrder } from 'src/store/orders/types'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'src/router'
import { OrderTimeoutSeconds } from 'src/store/orders/const'
import { remainPayTime, RemainZero } from 'src/store/orders/utils'

interface Props {
  orders: Array<UserOrder>
}

const props = defineProps<Props>()

const orders = toRef(props, 'orders')

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const remainTime = ref<Map<string, string>>()
let remainInterval = -1

const timeRemaining = () => {
  if (orders.value.length === 0) {
    return
  }

  let allTimeout = true
  remainTime.value = new Map<string, string>()

  for (let i = 0; i < orders.value.length; i++) {
    const remain = remainPayTime(orders.value[i].CreateAt)
    if (remain !== RemainZero) {
      allTimeout = false
      remainTime.value.set(orders.value[i].ID, remain)
    }
  }

  if (allTimeout) {
    clearInterval(remainInterval)
    remainInterval = -1
  }
}

const orderState = (order: UserOrder) => {
  if (order.Paid) {
    if (new Date().getTime() / 1000 > order.StartAt) {
      return t('MSG_IN_SERVICE')
    }
    return t('MSG_PAID')
  }
  if (Math.floor(new Date().getTime() / 1000) - order.CreateAt > OrderTimeoutSeconds) {
    return t('MSG_CANCELED_BY_TIMEOUT')
  }
  if (!order.Paid) {
    return remainTime.value?.get(order.ID)
  }
  return t('MSG_IN_SERVICE')
}

const orderTableColumns = computed(() => [
  {
    name: 'Date',
    label: t('dashboard.Column3.Date'),
    align: 'left',
    field: 'Date'
  },
  {
    name: 'Product',
    label: t('dashboard.Column3.Product'),
    align: 'center',
    field: 'Product'
  },
  {
    name: 'Amount',
    label: t('dashboard.Column3.Amount'),
    align: 'center',
    field: 'Amount'
  },
  {
    name: 'Price',
    label: t('dashboard.Column3.Price'),
    align: 'center',
    field: 'Price'
  },
  {
    name: 'Discount',
    label: t('dashboard.Column3.Discount'),
    align: 'center',
    field: 'Discount'
  },
  {
    name: 'TechFee',
    label: t('dashboard.Column3.Techfee'),
    align: 'center',
    field: 'TechFee'
  },
  {
    name: 'Period',
    label: t('dashboard.Column3.Period'),
    align: 'center',
    field: (row: UserOrder) => row.Period + t('dashboard.Day')
  },
  {
    name: 'Total',
    label: t('dashboard.Column3.Total'),
    align: 'center',
    field: (row: UserOrder) => row.Total + row.PayCoinUnit
  },
  {
    name: 'State',
    label: t('MSG_STATE'),
    align: 'center',
    field: (row: UserOrder) => orderState(row)
  }
])

const router = useRouter()

const onRowClick = (order: UserOrder) => {
  if (order.Paid) {
    return
  }
  if (Math.floor(new Date().getTime() / 1000) - order.CreateAt > OrderTimeoutSeconds) {
    return
  }
  void router.push({
    path: '/payment',
    query: {
      orderId: order.ID
    }
  })
}

onMounted(() => {
  remainInterval = setInterval(timeRemaining, 1000) as unknown as number
})

onUnmounted(() => {
  if (remainInterval >= 0) {
    clearInterval(remainInterval)
  }
})

</script>

<style scoped>
.table-box {
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 24px;
  margin: 24px;
}

.table-box >>> th {
  font-size: 16px !important;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin: 0 24px 30px 24px;
}

.export-button {
  border: 1px solid #ff964a;
  color: #ff964a;;
  text-shadow: 1px 1px 1px #27424c;
}

.purchase-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  text-shadow: 1px 1px 1px #ce5417;
}
</style>
