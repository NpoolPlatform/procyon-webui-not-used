<template>
  <q-table
    flat
    class='table-box'
    :rows='transactions'
    :columns='transactionTable'
    row-key='ID'
    color='#e1eeef'
    :no-data-label="$t('NoData')"
  >
  </q-table>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { Transaction } from 'src/store/transactions/types'
import { TimeStampToDate } from 'src/utils/utils'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t, locale } = useI18n({ useScope: 'global' })
const store = useStore()

const transactions = computed(() => store.getters.getTransactions)

const transactionTable = computed(() => [
  {
    name: 'Name',
    label: t('MSG_NAME'),
    align: 'left',
    field: (row: Transaction) => store.getters.getCoinByID(row.CoinTypeID).Name
  },
  {
    name: 'Date',
    label: t('MSG_DATE'),
    align: 'center',
    field: (row: Transaction) => TimeStampToDate(row.CreateAt, 'YYYY-MM-DD HH:mm', locale.value)
  },
  {
    name: 'Amount',
    label: t('MSG_AMOUNT'),
    align: 'center',
    field: 'Amount'
  },
  {
    name: 'Status',
    label: t('MSG_STATUS'),
    align: 'center',
    field: 'State'
  },
  {
    name: 'Type',
    label: t('MSG_TYPE'),
    align: 'center',
    field: () => 'Withdrawal'
  }
])

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
</style>
