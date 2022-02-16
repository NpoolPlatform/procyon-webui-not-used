<template>
  <q-table
    flat
    class='table-box'
    :rows='accounts'
    :columns='accountTable'
    row-key='ID'
    color='#e1eeef'
    :no-data-label="$t('NoData')"
  >
  </q-table>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '../../store'
import { WithdrawAccount } from '../../store/accounts/types'
import { TimeStampToDate } from '../../utils/utils'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t, locale } = useI18n({ useScope: 'global' })
const store = useStore()

const accounts = computed(() => store.getters.getWithdrawAccounts)

const accountTable = computed(() => [
  {
    name: 'Blockchain',
    label: t('MSG_BLOCKCHAIN'),
    align: 'left',
    field: (row: WithdrawAccount) => store.getters.getCoinByID(row.Account.CoinTypeID).Name
  },
  {
    name: 'Address',
    label: t('MSG_ADDRESS'),
    align: 'center',
    field: 'CreateAt'
  },
  {
    name: 'Date Added',
    label: t('MSG_DATE_ADDED'),
    align: 'center',
    field: (row: WithdrawAccount) => TimeStampToDate(row.Withdraw.CreateAt, 'YYYY-MM-DD HH:mm', locale.value)
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
