<template>
  <q-btn class='back-button' @click='onBackClick'>⭠</q-btn>
  <div class='content'>
    <Box :title="$t('MSG_WALLET_REGISTRATION')" :always-selectable="true" :show-link='false'>
      <h4>{{ t('MSG_BLOCKCHAIN') }}:</h4>
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
      <h4>{{ t('MSG_YOUR_WALLET_ADDRESS') }}:</h4>
      <input type='text' class='common-input' v-model='walletAddress' />
      <q-btn class='common-button submit-button' type='submit' @click='onAddressSubmit'>
        {{ $t('MSG_REGISTER_ADDRESS') }}
      </q-btn>
      <h3>Caution</h3>
      <p v-html='t("MSG_REGISTER_ADDRESS_CAUTION")' />
    </Box>
  </div>

  <q-dialog v-model='showVerify'>
    <CodeVerifier v-model:verify-by='verifyBy' v-model:verify-code='verifyCode' @verify='onVerify' />
  </q-dialog>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, onMounted, ref, watch, onUnmounted } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { Coin } from 'src/store/coins/types'
import { VerifyMethod } from 'src/store/users/const'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { useRouter } from 'src/router'
import { GenerateSendEmailRequest } from 'src/utils/utils'
import { ActionTypes as VerifyActionTypes } from 'src/store/verify/action-types'
import { SendEmailCodeRequest } from 'src/store/verify/types'
import { ActionTypes as AccountActionTypes } from 'src/store/accounts/action-types'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notificationPop, notify } from 'src/store/notifications/helper'
import { MutationTypes as AccountMutationTypes } from 'src/store/accounts/mutation-types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t, locale } = useI18n({ useScope: 'global' })

const Box = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const CodeVerifier = defineAsyncComponent(() => import('src/components/dialog/popupverify/CodeVerifier.vue'))

const coins = computed(() => store.getters.getCoins.filter((coin) => !coin.PreSale && !coin.ForPay))
const selectedCoin = ref(undefined as unknown as Coin)
const walletAddress = ref('')
const userInfo = computed(() => store.getters.getUserInfo)

const langID = computed(() => {
  let id = ''
  store.getters.getLanguages.forEach((lang) => {
    if (locale.value === lang.Lang) {
      id = lang.ID
    }
  })
  return id
})

const verifyBy = ref(VerifyMethod.VerifyNone)
const verifyCode = ref('')
const showVerify = ref(false)

const onAddressSubmit = () => {
  verifyBy.value = VerifyMethod.VerifyNone
  verifyCode.value = ''
  showVerify.value = true
}

watch(verifyBy, () => {
  let request: SendEmailCodeRequest = {
    EmailAddress: userInfo.value.User.EmailAddress as string,
    LangID: langID.value,
    UsedFor: 'SETWITHDRAWADDRESS'
  }
  switch (verifyBy.value) {
    case VerifyMethod.VerifyByEmail:
      request = GenerateSendEmailRequest(locale.value, userInfo.value, request)
      store.dispatch(VerifyActionTypes.SendEmail, request)
      break
    case VerifyMethod.VerifyByGoogle:
      break
  }
})
const onVerify = () => {
  showVerify.value = false

  if (!selectedCoin.value) {
    return
  }

  let account = ''
  if (verifyBy.value === VerifyMethod.VerifyByEmail) {
    account = userInfo.value.User.EmailAddress as string
  } else if (verifyBy.value === VerifyMethod.VerifyByMobile) {
    account = userInfo.value.User.PhoneNO as string
  } else if (verifyBy.value === VerifyMethod.VerifyByGoogle) {
    // DO NOTHING
  } else {
    return
  }
  store.dispatch(AccountActionTypes.SetWithdrawAddress, {
    CoinTypeID: selectedCoin.value.ID as string,
    Address: walletAddress.value,
    Account: account,
    AccountType: verifyBy.value,
    VerificationCode: verifyCode.value,
    NotifyMessage: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_SET_WITHDRAW_ADDRESS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const router = useRouter()
const onBackClick = () => {
  router.back()
}

const selectedCoinName = ref(t('MSG_PAYMENT_METHOD'))

const onCoinSelected = (coin: Coin) => {
  selectedCoin.value = coin
}
watch(coins, () => {
  selectedCoin.value = coins.value && coins.value.length > 0 ? coins.value[0] : undefined as unknown as Coin
})
watch(selectedCoin, () => {
  selectedCoinName.value = selectedCoin.value ? selectedCoin.value.Name : t('MSG_PAYMENT_METHOD')
})

type MyFunction = () => void
const unsubscribe = ref<MyFunction>()

onMounted(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === NotificationMutationTypes.Push) {
      const notification = store.getters.peekNotification(ModuleKey.ModuleApplications)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }

    if (mutation.type === AccountMutationTypes.SetWithdrawAccount) {
      router.back()
    }
  })

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

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>

<style lang='sass' scoped>
.content
  margin-top: 72px

.back-button
  background: linear-gradient(to bottom right, rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%)
  box-shadow: 16px 16px 20px 0 #23292b
  border-radius: 0 12px 12px 0
  cursor: pointer
  display: inline-block
  font-size: 24px
  line-height: 30px
  margin: 0
  opacity: .7
  padding: 16px 24px
  position: absolute
  text-transform: uppercase
  transition: all ease-in-out .2s

.coin-select
  border: solid 2px transparent
  border-radius: 12px
  width: 100%
  font-size: 14px
  font-weight: 400
  margin: 0px 0 24px 0
  color: #23292b
  padding-left: 10px
  background: #e1eeef
  text-shadow: none
  padding: 0 10px 0 5px
  min-height: 44px

.coin-select-item
  color: #23292b
  line-height: 20px

.coin-select:hover
  border: solid 2px #1ec498
  border-radius: 12px

input[type="text"],
input[type="number"]
  background: #e1eeef
  border: none
  border-radius: 12px
  box-shadow: 2px 2px 4px 0 #27424c
  color: #27424c
  font-size: 14px
  margin: 0px 0 24px 0
  padding: 12px
  width: 100%

input[type="text"]:active,
input[type="text"]:focus
input[type="number"]:active,
input[type="number"]:focus
  outline: 2px solid #1ec498

h4
  font-size: 18px
  font-weight: 400
  margin: 12px 0

.submit-button
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%)
  border: 1px solid #ff964a
  margin: 0 0 10px 0
  width: 100%

::v-deep ul
  font-size: 18px
  font-weight: 300
  line-height: 36px
  list-style: none

::v-deep ul li::before
  color: #1ec498
  content: "\2727" /* hollow star */
  /* content: "\2726"; /*filled star*/
  /* content: "\21e2"; /*dashed arrow*/
  display: inline-block
  margin-left: -32px
  width: 32px

::v-deep ul strong
  font-weight: 700
</style>
