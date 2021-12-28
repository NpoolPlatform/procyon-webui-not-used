<template>
  <q-table
    flat
    class='table-box'
    :rows='orders'
    :columns='orderTableColumns'
    row-key='name'
    color='#e1eeef'
    :no-data-label="$t('NoData')"
  >
  </q-table>

  <div class='buttons'>
    <q-btn disabled class='common-button export-button'>
      {{ $t('button.Export') }}
    </q-btn>
    <q-btn disabled class='common-button purchase-button'>
      {{ $t('button.Purchase') }}
    </q-btn>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, toRef, withDefaults } from 'vue'
import { UserOrderDetail } from 'src/store/order/types'
import { useI18n } from 'vue-i18n'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const orderTableColumns = [
  {
    name: 'date',
    label: t('dashboard.Column3.Date'),
    align: 'left',
    field: (row: UserOrderDetail) => row.Date
  },
  {
    name: 'product',
    label: t('dashboard.Column3.Product'),
    align: 'center',
    field: (row: UserOrderDetail) => row.Product
  },
  {
    name: 'amount',
    label: t('dashboard.Column3.Amount'),
    align: 'center',
    field: (row: UserOrderDetail) => row.Amount
  },
  {
    name: 'price',
    label: t('dashboard.Column3.Price'),
    align: 'center',
    field: (row: UserOrderDetail) => row.Price
  },
  {
    name: 'discount',
    label: t('dashboard.Column3.Discount'),
    align: 'center',
    field: (row: UserOrderDetail) => row.Discount
  },
  {
    name: 'techFee',
    label: t('dashboard.Column3.Techfee'),
    align: 'center',
    field: (row: UserOrderDetail) => row.TechFee
  },
  {
    name: 'period',
    label: t('dashboard.Column3.Period'),
    align: 'center',
    field: (row: UserOrderDetail) => row.Period + t('dashboard.Day')
  },
  {
    name: 'total',
    label: t('dashboard.Column3.Total'),
    align: 'center',
    field: (row: UserOrderDetail) => row.Total + 'USDT'
  }
]

interface Props {
  orders: Array<UserOrderDetail>
}

const props = withDefaults(defineProps<Props>(), {
})

const orders = toRef(props, 'orders')
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
