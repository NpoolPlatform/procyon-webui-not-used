<template>
  <q-table
    flat
    class='table-box'
    :rows='assets'
    :columns='assetTable'
    row-key='ID'
    color='#e1eeef'
    :no-data-label="$t('NoData')"
  >
  </q-table>
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as BenefitActionTypes } from 'src/store/benefits/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const store = useStore()
const benefits = computed(() => store.getters.getBenefits)

interface Asset {
  Name: string
  Balance: number
  Last24HoursIncoming: number
  USDTValue: number
  JPYValue: number
}

// TODO: get market value of different coin type
const assets = computed(() => {
  const myAssets = new Map<string, Asset>()
  benefits.value.forEach((benefit) => {
    const good = store.getters.getGoodByID(benefit.GoodID)
    let asset = myAssets.get(good?.Main?.ID as string)
    if (!asset) {
      asset = {
        Name: store.getters.getGoodByID(benefit.GoodID)?.Main?.Name,
        Balance: 0,
        Last24HoursIncoming: 0,
        USDTValue: 0,
        JPYValue: 0
      } as Asset
    }

    asset.Balance += benefit.Amount
    asset.USDTValue += store.getters.getCoinCurrency(store.getters.getGoodByID(benefit.GoodID)?.Main?.ID as string, 'usd')
    asset.JPYValue += store.getters.getCoinCurrency(store.getters.getGoodByID(benefit.GoodID)?.Main?.ID as string, 'jpy')

    if (new Date().getTime() / 1000 < benefit.CreateAt + 24 * 60 * 60) {
      asset.Last24HoursIncoming += benefit.Amount
    }
    myAssets.set(good?.Main?.ID as string, asset)
  })

  return Array.from(myAssets).map(([, value]) => value)
})

const assetTable = computed(() => [
  {
    name: 'Name',
    label: t('MSG_NAME'),
    align: 'left',
    field: 'Name'
  },
  {
    name: 'Balance',
    label: t('MSG_BALANCE'),
    align: 'center',
    field: 'Balance'
  },
  {
    name: '24 Hour Change',
    label: t('MSG_24_HOUR_CHANGE'),
    align: 'center',
    field: 'Last24HoursIncoming'
  },
  {
    name: 'Market Value (USDT)',
    label: t('MSG_MARKET_VALUE_USDT'),
    align: 'center',
    field: 'USDTValue'
  },
  {
    name: 'Market Value (JPY)',
    label: t('MSG_MARKET_VALUE_JPY'),
    align: 'center',
    field: 'JPYValue'
  }
])

onMounted(() => {
  store.dispatch(BenefitActionTypes.GetUserBenefitsByAppUser, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_BENEFITS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(CoinActionTypes.GetCoinsCurrencies, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_COINS_CURRENCIES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
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
</style>
