<template>
  <div class='container'>
    <q-table
      flat
      :rows='accounts'
      class='table-box'
      :columns='accountTable'
      row-key='ID'
      color='#e1eeef'
      :no-data-label="$t('NoData')"
      :hide-bottom='false'
    >
    </q-table>
    <q-btn class='common-button filled-button small-button' @click='onAddNewAddressClick'>
      {{ t('MSG_ADD_NEW_ADDRESS') }}
    </q-btn>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '../../store'
import { WithdrawAccount } from '../../store/accounts/types'
import { TimeStampToDate } from '../../utils/utils'
import { useRouter } from '../../router'

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

const router = useRouter()

const onAddNewAddressClick = () => {
  void router.push({ path: '/add/withdraw/address' })
}

</script>

<style scoped>
.container {
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  padding: 24px;
  margin: 24px;
}

.table-box {
  background: transparent;
  color: #e1eeef;
  margin-bottom: 16px;
}

.table-box >>> th {
  font-size: 16px !important;
}

.filled-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  text-shadow: 1px 1px 1px #ce5417;
}

.small-button {
  font-size: 10px;
}
</style>
