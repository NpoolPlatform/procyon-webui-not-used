<template>
  <Box :title="$t('MSG_WALLET_REGISTRATION')" :always-selectable="true" :show-link='false'>
    <h4>{{ t('MSG_BLOCKCHAIN') }}</h4>
    <q-btn-dropdown
      class='coin-select'
      flat
      dense
      no-caps
      unelevated
      align='between'
      auto-close
      :label='selectedCoinName'
    >
      <q-list>
        <q-item
          dense
          class='coin-select-item'
          clickable
          v-for='coin in coins'
          :key='coin.ID'
          @click="() => onCoinSelected(coin)"
        >
          <q-item-section>
            <q-item-label>{{ coin.Name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </Box>

  <q-dialog v-model='showVerify'>
    <CodeVerifier :verify-by='verifyBy' v-model:verify-code='verifyCode' />
  </q-dialog>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { Coin } from 'src/store/coins/types'
import { VerifyMethod } from 'src/store/users/const'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const Box = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const CodeVerifier = defineAsyncComponent(() => import('src/components/dialog/popupverify/CodeVerifier.vue'))

const coins = computed(() => store.getters.getCoins.filter((coin) => !coin.PreSale && !coin.ForPay))
const selectedCoin = ref(undefined as unknown as Coin)

const selectedCoinName = computed(() => {
  return selectedCoin.value ? selectedCoin.value.Name : t('MSG_PAYMENT_METHOD')
})

const onCoinSelected = (coin: Coin) => {
  selectedCoin.value = coin
}

const verifyBy = ref(VerifyMethod.VerifyNone)
const verifyCode = ref('')
const showVerify = ref(false)

onMounted(() => {
  store.dispatch(CoinActionTypes.GetCoins, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_COINS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

</script>

<style lang='sass' scoped>
.coin-select
  border: solid 2px transparent
  border-radius: 12px
  width: 240px
  font-size: 14px
  font-weight: 400
  margin: 8px 0 24px 0
  color: #23292b
  padding-left: 10px
  background: #e1eeef
  text-shadow: none
  padding: 0 10px 0 5px

.coin-select-item
  color: #23292b
  line-height: 20px

.coin-select:hover
  border: solid 2px #1ec498
  border-radius: 12px
</style>
