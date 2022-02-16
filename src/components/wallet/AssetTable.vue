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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'

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
      asset = {} as Asset
    }
    asset.Balance += benefit.Amount
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
