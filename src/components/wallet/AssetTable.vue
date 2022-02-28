<template>
  <q-table
    flat
    class='table-box'
    :rows='assets'
    :columns='assetTable'
    row-key='Name'
    color='#e1eeef'
    :no-data-label="$t('NoData')"
  >
    <template #body='props'>
      <q-tr :props='props'>
        <q-td key='Name' :props='props'>
          {{ props.row.Name }}
        </q-td>
        <q-td key='Balance' :props='props'>
          {{ props.row.Balance }}
        </q-td>
        <q-td key='Last24HoursIncoming' :props='props'>
          {{ props.row.Last24HoursIncoming }}
        </q-td>
        <q-td key='USDTValue' :props='props'>
          {{ props.row.USDTValue }}
        </q-td>
        <q-td key='JPYValue' :props='props'>
          {{ props.row.JPYValue }}
        </q-td>
        <q-td>
          <q-btn
            no-caps
            :label='t("MSG_WITHDRAW")'
            class='filled-button small-button'
            @click='() => onWithdrawClick(props.row)'
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as BenefitActionTypes } from 'src/store/benefits/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { useRouter } from 'src/router'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const store = useStore()
const benefits = computed(() => store.getters.getBenefits)
const coinsCurrencies = computed(() => store.getters.getCoinsCurrencies)

interface Asset {
  Name: string
  Balance: number
  Last24HoursIncoming: number
  USDTValue: number
  JPYValue: number
  CoinTypeID: string
}

const assets = computed(() => {
  const myAssets = new Map<string, Asset>()
  benefits.value.forEach((benefit) => {
    const good = store.getters.getGoodByID(benefit.GoodID)
    let asset = myAssets.get(good?.Main?.ID as string)
    if (!asset) {
      asset = {
        Name: store.getters.getGoodByID(benefit.GoodID)?.Main?.Unit,
        Balance: 0,
        Last24HoursIncoming: 0,
        USDTValue: 0,
        JPYValue: 0,
        CoinTypeID: store.getters.getGoodByID(benefit.GoodID)?.Main?.ID
      } as Asset
    }

    asset.Balance += benefit.Amount
    if (new Date().getTime() / 1000 < benefit.CreateAt + 24 * 60 * 60) {
      asset.Last24HoursIncoming += benefit.Amount
    }
    myAssets.set(good?.Main?.ID as string, asset)
  })

  const remainAssets = new Map<string, Asset>()
  myAssets.forEach((asset) => {
    const txs = store.getters.getTransactionsByCoin(asset.CoinTypeID)
    const accounts = store.getters.getWithdrawAccountsByCoin(asset.CoinTypeID)
    let outcoming = 0
    txs.forEach((tx) => {
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].Account.ID === tx.ToAddressID) {
          outcoming += tx.Amount
          return
        }
      }
    })
    asset.Balance -= outcoming

    asset.USDTValue = asset.Balance * store.getters.getCoinCurrency(asset.CoinTypeID, 'usd')
    asset.JPYValue = asset.Balance * store.getters.getCoinCurrency(asset.CoinTypeID, 'jpy')

    remainAssets.set(asset.CoinTypeID, asset)
  })

  return Array.from(remainAssets).map(([, value]) => value)
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
    name: 'Last24HoursIncoming',
    label: t('MSG_24_HOUR_CHANGE'),
    align: 'center',
    field: 'Last24HoursIncoming'
  },
  {
    name: 'USDTValue',
    label: t('MSG_MARKET_VALUE_USDT'),
    align: 'center',
    field: 'USDTValue'
  },
  {
    name: 'JPYValue',
    label: t('MSG_MARKET_VALUE_JPY'),
    align: 'center',
    field: 'JPYValue'
  },
  {
    name: 'ActionButtons',
    label: '',
    align: 'center'
  }
])

const router = useRouter()

const onWithdrawClick = (asset: Asset) => {
  void router.push({
    path: '/withdraw',
    query: {
      coinTypeID: asset.CoinTypeID,
      totalAmount: asset.Balance
    }
  })
}

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

  if (!coinsCurrencies.value) {
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
