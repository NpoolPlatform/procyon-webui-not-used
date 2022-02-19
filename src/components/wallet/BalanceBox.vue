<template>
  <div class='earn-box'>
    <div class='earn-box-item'>
      <div>
        <span class='price'>{{ usdtAmount }}</span>
        <span class='unit'> USDT</span>
      </div>
      <div class='hr sub-hr'></div>
      <span class='subtitle'>{{ $t('MSG_CURRENT_BALANCE') }} (USDT)</span>
    </div>

    <div class='earn-box-item'>
      <div>
        <span class='price'>{{ jpyAmount }}</span>
        <span class='unit'> JPY</span>
      </div>
      <div class='hr sub-hr'></div>
      <span class='subtitle'>{{ $t('MSG_CURRENT_BALANCE') }} (JPY)</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useStore } from 'src/store'

const store = useStore()
const benefits = computed(() => store.getters.getBenefits)
const accounts = computed(() => store.getters.getWithdrawAccounts)
const transactions = computed(() => store.getters.getTransactions)

const usdtAmount = computed(() => {
  let amount = 0

  benefits.value.forEach((benefit) => {
    amount += benefit.Amount * store.getters.getCoinCurrency(store.getters.getGoodByID(benefit.GoodID)?.Main?.ID as string, 'usd')
  })
  transactions.value.forEach((tx) => {
    accounts.value.forEach((account) => {
      if (account.Account.CoinTypeID === tx.CoinTypeID && account.Account.ID === tx.ToAddressID) {
        amount -= tx.Amount * store.getters.getCoinCurrency(tx.CoinTypeID, 'usd')
      }
    })
  })
  return amount.toFixed(2)
})
const jpyAmount = computed(() => {
  let amount = 0
  benefits.value.forEach((benefit) => {
    amount += benefit.Amount * store.getters.getCoinCurrency(store.getters.getGoodByID(benefit.GoodID)?.Main?.ID as string, 'jpy')
  })
  transactions.value.forEach((tx) => {
    accounts.value.forEach((account) => {
      if (account.Account.CoinTypeID === tx.CoinTypeID && account.Account.ID === tx.ToAddressID) {
        amount -= tx.Amount * store.getters.getCoinCurrency(tx.CoinTypeID, 'jpy')
      }
    })
  })
  return amount.toFixed(2)
})

</script>

<style scoped>
.earn-box {
  display: flex;
  justify-content: center;
}

.earn-box-item {
  display: flex;
  flex-direction: column;
  padding: 0 36px;
  text-align: center;
  min-width: 240px;
  width: 30%;
}

.price {
  font-size: 36px;
  font-weight: 700;
  text-transform: uppercase;
}

.unit {
  color: #1ec498;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 0 2px;
  text-transform: uppercase;
}

.subtitle {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 12px 0;
}

.sub-hr {
  margin: 0;
}
</style>
