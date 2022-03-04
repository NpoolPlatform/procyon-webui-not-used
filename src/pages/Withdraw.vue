<template>
  <q-page class='container'>
    <q-btn class='back-button' @click='onBackClick'>⭠</q-btn>
    <div class='content'>
      <div class='product-container'>
        <div class='product-title-section'>
          <div class='product-page-icon'><img :src='spacemeshImg'></div>
          <h1>{{ t('MSG_SPACEMESH') }}</h1>
        </div>
        <div class='withdraw'>
          <h3>{{ t('MSG_ASSET_WITHDRAWAL') }}</h3>
          <div class='info-flex'>
            <div class='full-section'>
              <h4>{{ t('MSG_AVAILABLE_WITHDRAWAL') }}:</h4>
              <span class='number'>{{ query.totalAmount }}</span>
              <span class='unit'>{{ coin?.Unit }}</span>
            </div>
            <div class='full-section'>
              <h4>{{ t('MSG_AMOUNT_TO_WITHDRAW', {UNIT: coin?.Unit}) }}:</h4>
              <input type='number' v-model='withdrawAmount' class='action-width'>
              <div v-if='withdrawAmount <= 0 || withdrawAmount > query.totalAmount' class='coupon-error'>{{ t('MSG_INVALID_AMOUNT') }}</div>
            </div>
            <div class='full-section'>
              <h4>{{ t('MSG_SELECT_WITHDRAW_ADDRESS') }}:</h4>
              <span
                v-for='address in addresses' :key='address.Account.ID'
                v-bind:class='{ "address-option": true, "address-selected": address.Account.ID === withdrawAddress?.Account?.ID }'
                @click='() => onAddressSelected(address)'
              >
                <span class='wallet-type'>{{ coin?.Unit }}</span>
                <span class='number'>{{ address.Account.Address }}</span>
                <img class='checkmark' :src='iconCheckmark'>
              </span>
            </div>
          </div>
          <q-btn no-caps :label='t("MSG_WITHDRAW")' class='submit-btn submit' @click='onSubmit' />
          <h3>{{ t('MSG_GUIDE_AND_FAQ') }}</h3>
          <p v-html='t("MSG_WITHDRAW_GUIDE_AND_FAQ_CONTENT", {UNIT: coin?.Unit, COIN_NAME: coin.Name})' />
        </div>
      </div>
    </div>
  </q-page>

  <q-dialog v-model='showVerify'>
    <CodeVerifier v-model:verify-by='verifyBy' v-model:verify-code='verifyCode' @verify='onVerify' />
  </q-dialog>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, onMounted, ref, onUnmounted, watch } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notificationPop, notify } from 'src/store/notifications/helper'
import { MutationTypes as TransactionMutationTypes } from 'src/store/transactions/mutation-types'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { useRoute } from 'vue-router'
import { useRouter } from 'src/router'
import { VerifyMethod } from 'src/store/users/const'
import { ActionTypes as TransactionActionTypes } from 'src/store/transactions/action-types'
import { ActionTypes as VerifyActionTypes } from 'src/store/verify/action-types'
import { ActionTypes as AccountActionTypes } from 'src/store/accounts/action-types'

import spacemeshImg from 'src/assets/product-spacemesh.svg'
import iconCheckmark from 'src/assets/icon-checkmark.svg'

import { WithdrawAccount } from 'src/store/accounts/types'
import { SendEmailCodeRequest } from 'src/store/verify/types'
import { GenerateSendEmailRequest } from 'src/utils/utils'
import { State } from 'src/store/kycs/const'
import { WithdrawType } from 'src/store/transactions/const'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t, locale } = useI18n({ useScope: 'global' })

const CodeVerifier = defineAsyncComponent(() => import('src/components/dialog/popupverify/CodeVerifier.vue'))

const route = useRoute()
const router = useRouter()

interface myQuery {
  coinTypeID: string
  totalAmount: number
}
const query = computed(() => route.query as unknown as myQuery)
const coin = computed(() => store.getters.getCoinByID(query.value.coinTypeID))
const addresses = computed(() => store.getters.getWithdrawAccountsByCoin(query.value.coinTypeID).filter((account) => account.State === State.Verified))
const withdrawAmount = ref(0)
watch(withdrawAmount, () => {
  withdrawAmount.value = withdrawAmount.value < 0 || withdrawAmount.value > query.value.totalAmount ? 0 : withdrawAmount.value
})

const withdrawAddress = ref(undefined as unknown as WithdrawAccount)
watch(addresses, () => {
  if (addresses.value && addresses.value.length > 0) {
    if (!withdrawAddress.value) {
      withdrawAddress.value = addresses.value[0]
    }
  }
})

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

const onSubmit = () => {
  if (!coin.value || !withdrawAddress.value || withdrawAmount.value <= 0 || withdrawAmount.value >= query.value.totalAmount) {
    return
  }

  verifyBy.value = VerifyMethod.VerifyNone
  verifyCode.value = ''
  showVerify.value = true
}

watch(verifyBy, () => {
  let request: SendEmailCodeRequest = {
    EmailAddress: userInfo.value.User.EmailAddress as string,
    LangID: langID.value,
    UsedFor: 'WITHDRAW'
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

  if (!coin.value || !withdrawAddress.value || withdrawAmount.value <= 0 || withdrawAmount.value >= query.value.totalAmount) {
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
  store.dispatch(TransactionActionTypes.SubmitUserWithdraw, {
    Info: {
      CoinTypeID: query.value.coinTypeID,
      WithdrawToAccountID: withdrawAddress.value.Account.ID,
      Amount: withdrawAmount.value,
      WithdrawType: WithdrawType.Benefit
    },
    Account: account,
    AccountType: verifyBy.value,
    VerificationCode: verifyCode.value,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_SUBMIT_WITHDRAW_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onAddressSelected = (address: WithdrawAccount) => {
  withdrawAddress.value = address
}

const onBackClick = () => {
  router.back()
}

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

    if (mutation.type === TransactionMutationTypes.SetWithdraws) {
      router.back()
    }
  })

  if (!coin.value) {
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
  }

  store.dispatch(AccountActionTypes.GetUserWithdrawAccountsByAppUser, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_WITHDRAW_ADDRESSES_FAIL'),
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

.back-button:hover
  opacity: 1

.container
  margin-top: 48px

.product-container
  background: linear-gradient(to bottom right, rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%)
  box-shadow: 16px 16px 20px 0 #23292b
  border-radius: 12px
  color: #e1eeef
  display: flex
  flex-wrap: wrap
  padding: 48px
  margin: 48px auto
  min-width: 360px

.product-title-section
  margin: 0 0 24px 0
  width: 100%

.product-page-icon
  background: linear-gradient(to bottom right, #54e280 0, #1ec498 100%)
  border-radius: 4px
  box-shadow: 2px 2px 4px #23292b88
  display: inline-block
  margin: 0 8px 0 0
  padding: 10px
  text-align: center
  transition: all ease-in-out .1s
  height: 60px
  width: 60px

.product-page-icon img
  filter: saturate(0) contrast(100) opacity(0.7)
  vertical-align: middle
  height: 40px
  width: 40px

.product-container h1
  display: inline-block
  margin: 0
  vertical-align: middle

.product-container .info
  padding: 0 5% 0 0
  width: 75%

.product-container .info-flex
  display: flex
  flex-wrap: wrap

.product-container h1
  display: inline-block
  margin: 0
  vertical-align: middle

.product-title-section
  margin: 0 0 24px 0
  width: 100%

.product-container .info
  padding: 0 5% 0 0
  width: 75%

.product-container .info-flex
  display: flex
  flex-wrap: wrap

.product-container .three-section
  margin: 0 3% 12px 0
  width: 30%

.product-container .full-section
  margin: 12px 0
  width: 100%

.product-detail-text h3
  margin: 24px 0

.product-detail-text h3::after
  width: 60%

.product-container h4
  font-size: 18px
  font-weight: 400
  margin: 12px 0
  text-transform: unset

.product-container p:not([class])
  font-size: 16px
  line-height: 28px
  margin: 0 0 16px 0

.product-container ul
  font-size: 16px

.product-container span
  font-size: 28px

.product-container .number
  background: linear-gradient(to bottom right, #ffe91d -50%, #ce5417 150%)
  background-clip: border-box
  filter: contrast(1.5)
  overflow-wrap: anywhere
  -webkit-background-clip: text
  -webkit-box-decoration-break: clone
  -webkit-text-fill-color: transparent

.product-container .unit,
.product-container .wallet-type
  color: #e4f4f0
  filter: contrast(1.5)
  font-size: 16px
  font-weight: 700

.product-container .hr
  background: linear-gradient(to right, transparent 0, #e1eeef 10%, transparent 100%)
  height: 1px
  margin: 24px 0

.product-container button
  margin: 0 0 24px 0
  width: 100%

.product-container .coupon-error
  color: #fc4468
  font-size: 14px
  margin-top: -18px

h3.form-title
  color: #e1eeef
  font-size: 24px
  font-weight: 200
  position: relative
  margin: 0 0 24px 0
  padding: 0 0 24px 0

h3.form-title::after
  background: linear-gradient(to right, transparent 0, #e1eeef 10%, transparent 100%)
  display: block
  content: ''
  position: absolute
  left: 0
  bottom: 0
  height: 1px
  width: 100%

.product-detail-text h3
  margin: 24px 0

.product-detail-text h3::after
  width: 60%

.order-form
  width: 25%

.submit-btn
  margin: 36px 0 0 0
  width: 200px
  line-height: 24px
  margin: 24px 0 24px 0 !important

.content-image
  border-radius: 24px
  box-shadow: 4px 4px 20px 0 #1f293a
  width: 100%

.product-container .coupon-error
  color: #fc4468
  font-size: 14px
  margin-top: -18px

button,
input[type="submit"]
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%)
  border: 0
  border-radius: 18px
  color: #e4f4f0
  cursor: pointer
  font-family: 'Barlow', sans-serif
  font-size: 18px
  font-weight: 600
  height: 48px
  margin: 24px 24px 24px 0
  padding: 12px 24px
  text-shadow: 1px 1px 1px #ce5417
  transition: all ease-in-out .1s

button.alt,
input[type="submit"].send-code
  background: none
  border: 1px solid #ff964a
  color: #ff964a
  text-shadow: 1px 1px 1px #27424c

button:hover,
input[type="submit"]:hover
  border-radius: 4px
  filter: contrast(1.5)

.nav button
  font-size: 16px
  height: auto
  margin: 0
  padding: 12px 20px
  text-transform: uppercase

button.in-active
  filter: saturate(0) contrast(.7)

input[type="text"],
input[type="number"]
  background: #e1eeef
  border: none
  border-radius: 12px
  box-shadow: 2px 2px 4px 0 #27424c
  color: #27424c
  font-size: 14px
  margin: 8px 0 24px 0
  padding: 12px
  width: 100%

input[type="text"]:active,
input[type="text"]:focus
input[type="number"]:active,
input[type="number"]:focus
  outline: 2px solid #1ec498

input.error
  outline: 2px solid #e85f1a

.product-container .address-option
  border-radius: 18px
  cursor: pointer
  display: inline-block
  margin: 12px 0 24px 0
  transition: all ease-in-out .1s
  width: 100%

.product-container .address-option .number
  filter: contrast(.5)

.product-container .checkmark
  display: none
  opacity: 0
  height: 20px

.product-container .address-option:hover .number
  filter: contrast(1.5)

.product-container .address-option:hover .checkmark
  display: inline
  opacity: .8

.product-container .address-selected .number
  filter: contrast(1.5)

.product-container .address-selected .checkmark
  filter: contrast(1.5)
  display: inline
  opacity: 1

.action-width
  width: 120px

.product-container .withdraw
  padding: 0 5% 0 0
  width: 100%

.product-container .withdraw .submit,
.product-container .withdraw input
  width: 200px
</style>
