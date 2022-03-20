<template>
  <q-page :class='[ showStatus ? "container blur" : "container" ]'>
    <q-btn class='back-button' @click='onBackClick'>⭠</q-btn>
    <div class='content'>
      <div class='product-container'>
        <div class='product-title-section'>
          <div class=product-page-icon><img :src='spacemeshImg'></div>
          <h1>{{ t('MSG_SPACEMESH_MINING') }}</h1>
        </div>
        <div class='info'>
          <h3 class='form-title'>
            {{ order?.PayWithCoin?.Unit }} | <strong>{{ t('MSG_ORDER_ID') }}: {{ query.orderId }}</strong>
          </h3>
          <div class='info-flex'>
            <div class='three-section'>
                <h4>{{ t('MSG_PURCHASE_UNITS') }}</h4>
                <span class='number'>{{ order?.Order.Order.Units }}</span>
                <span class='unit'>{{ order?.Good.Good?.Good.Unit }}</span>
            </div>
            <div class='three-section'>
                <h4>{{ t('MSG_AMOUNT_DUE') }}</h4>
                <span class='number'>{{ order?.Order.Payment?.Amount }}</span>
                <span class='unit'>{{ order?.PayWithCoin?.Unit }}</span>
                <img class='copy-button' :src='iconCopy' @click='onCopyAmountClick'>
            </div>
            <div class='three-section'>
                <h4>{{ t('MSG_TIME_REMAINING') }}</h4>
                <span class='number'>{{ remainTime }}</span>
            </div>
            <div class='full-section'>
                <h4>{{ t('MSG_RECEIVING_ADDRESS') }}</h4>
                <span class='wallet-type'>{{ order?.PayWithCoin?.Unit }}</span>
                <span class='number'>{{ order?.PayToAccount?.Address }}</span>
                <img class='copy-button' :src='iconCopy' @click='onCopyAddressClick'>
            </div>
          </div>
          <div class='hr'></div>
          <h4>{{ t('MSG_IMPORTANT_INFORMATION') }}</h4>
          <p v-html='t("MSG_PAYMENT_HINT", {COIN_TYPE: order?.PayWithCoin?.Unit as string})' />
        </div>
        <div class='order-form'>
          <h3 class='form-title'>{{ t('MSG_SCAN_QR_CODE_TO_PAY') }}</h3>
          <div class='qr-code-container' ref='qrCodeContainer'>
            <h5>{{ order?.PayWithCoin?.Unit }} ADDRESS</h5>
            <qrcode-vue
              :value='order?.PayToAccount?.Address'
              :size='qrCodeContainer?.clientWidth as number - 1'
              :margin='3'
              class='qr-code'
            />
          </div>
          <div class='hr'></div>
          <button @click='onPaymentCompleteClick'>{{ t('MSG_PAYMENT_COMPLETE') }}</button>
          <button class='alt' @click='onPayLaterClick'>{{ t('MSG_PAY_LATER') }}</button>
        </div>
      </div>
      <div class='hr'></div>
    </div>
  </q-page>
  <q-dialog content-class='blur' v-model='showStatus'>
    <PaymentState
      :order-id='query.orderId'
      :title='popupTitle'
      :tip-message='tipMessage'
      :state='orderStatus'
      :show-type='showType'
      :remain-time='remainTime'
      @proceed='onPaymentProceed'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { useStore } from 'src/store'
import { computed, onBeforeMount, onMounted, onUnmounted, ref, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notificationPop, notify } from 'src/store/notifications/helper'
import { useRouter } from 'src/router'
import { ActionTypes } from 'src/store/orders/action-types'

import spacemeshImg from 'src/assets/product-spacemesh.svg'
import iconCopy from 'src/assets/icon-copy.svg'
import copy from 'copy-to-clipboard'
import { orderToUserOrder, RemainMax, remainPayTime, RemainZero } from 'src/store/orders/utils'

const QrcodeVue = defineAsyncComponent(() => import('qrcode.vue'))
const PaymentState = defineAsyncComponent(() => import('src/components/dialog/payment/Payment.vue'))

const router = useRouter()
const route = useRoute()
const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

interface myQuery {
  orderId: string
}
const query = computed(() => route.query as unknown as myQuery)
const order = computed(() => store.getters.getOrderByID(query.value.orderId))

const onBackClick = () => {
  router.back()
}

const showStatus = ref(false)
const popupTitle = ref('')
const tipMessage = ref('')
const orderStatus = ref('')
const showType = ref('')

const qrCodeContainer = ref<HTMLDivElement>()

const remainTime = ref(RemainMax)
let remainInterval = -1
let paymentChecker = -1

const timeRemaining = () => {
  if (!order.value) {
    remainTime.value = RemainZero
    if (remainInterval >= 0) {
      clearInterval(remainInterval)
      remainInterval = -1
    }
    return
  }

  const myOrder = orderToUserOrder(order.value)
  if (myOrder.Paid) {
    showStatus.value = true
    popupTitle.value = 'MSG_ORDER_COMPLETE'
    tipMessage.value = 'MSG_REVIEW_ORDER'
    orderStatus.value = 'MSG_COMPLETE'
    showType.value = 'date'
    if (remainInterval >= 0) {
      clearInterval(remainInterval)
      remainInterval = -1
    }
    return
  }

  remainTime.value = remainPayTime(order.value.Order.Payment ? order.value.Order.Payment.CreateAt : 0)
  if (remainTime.value === RemainZero) {
    showStatus.value = true
    popupTitle.value = 'MSG_ORDER_TIMEOUT'
    tipMessage.value = 'MSG_ORDER_TIMEOUT'
    orderStatus.value = 'MSG_TIMEOUT'
    if (remainInterval >= 0) {
      clearInterval(remainInterval)
      remainInterval = -1
    }
  }
}

const onPaymentCompleteClick = () => {
  const payment = order.value?.Order.Payment
  if (!payment) {
    return
  }

  store.dispatch(ActionTypes.UpdatePayment, {
    Info: {
      ID: payment.ID,
      OrderID: payment.OrderID,
      AccountID: payment.AccountID,
      Amount: payment.Amount,
      CoinInfoID: payment.CoinInfoID,
      State: payment.State,
      ChainTransactionID: payment.ChainTransactionID,
      PlatformTransactionID: payment.PlatformTransactionID,
      CreateAt: payment.CreateAt,
      UserSetPaid: true
    },
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_UPDATE_PAYMENT_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  showStatus.value = true
  popupTitle.value = 'MSG_ORDER_PENDING'
  tipMessage.value = 'MSG_ORDER_PAYMENT_AWAITING'
  orderStatus.value = 'MSG_PENDING'
}

const onPayLaterClick = () => {
  showStatus.value = true
  popupTitle.value = 'MSG_PAY_LATER'
  tipMessage.value = 'MSG_ORDER_PAY_LATER'
  orderStatus.value = 'MSG_NOT_PAID'
  showType.value = 'remain'
}

const onPaymentProceed = () => {
  void router.push({
    path: '/dashboard'
  })
}

onBeforeMount(() => {
  if (!order.value) {
    store.dispatch(ActionTypes.GetOrder, {
      ID: query.value.orderId,
      Message: {
        ModuleKey: ModuleKey.ModuleApplications,
        Error: {
          Title: t('MSG_GET_ORDER_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  }
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
  })

  remainInterval = setInterval(timeRemaining, 1000) as unknown as number
  paymentChecker = setInterval(() => {
    store.dispatch(ActionTypes.GetOrder, {
      ID: query.value.orderId,
      Message: {
        ModuleKey: ModuleKey.ModuleApplications,
        Error: {
          Title: t('MSG_GET_ORDER_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  }, 5000) as unknown as number
})

onUnmounted(() => {
  unsubscribe.value?.()
  if (remainInterval >= 0) {
    clearInterval(remainInterval)
  }
  if (paymentChecker >= 0) {
    clearInterval(paymentChecker)
  }
})

const onCopyAmountClick = () => {
  copy(order.value?.Order.Payment?.Amount.toString() as string)
}

const onCopyAddressClick = () => {
  copy(order.value?.PayToAccount?.Address as string)
}

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
  margin-right: 5px

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
  font-size: 20px
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
  width: 100%
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
input[type='submit']
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
input[type='submit'].send-code
  background: none
  border: 1px solid #ff964a
  color: #ff964a
  text-shadow: 1px 1px 1px #27424c

button:hover,
input[type='submit']:hover
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

input[type='text'],
input[type='number']
  background: #e1eeef
  border: none
  border-radius: 12px
  box-shadow: 2px 2px 4px 0 #27424c
  color: #27424c
  font-size: 14px
  margin: 8px 0 24px 0
  padding: 12px
  width: 100%

input[type='number']:active,
input[type='number']:focus
  outline: 2px solid #1ec498

input.error
  outline: 2px solid #e85f1a

.payment-select
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

.payment-select-item
  color: #23292b
  line-height: 20px

.payment-select:hover
  border: solid 2px #1ec498
  border-radius: 12px

.qr-code-container
  margin: 24px 0
  text-align: center
  width: 100%

.qr-code
  border-radius: 0 0 12px 12px
  width: 100%

.form-container .hr
  height: 1px
  margin: 24px 0

.qr-code-container h5
  background: #fc4468
  border-radius: 12px 12px 0 0
  font-size: 20px
  font-weight: 400
  margin: 0
  padding: 4px
  text-transform: uppercase

img.copy-button
  cursor: pointer
  margin: 0 0 0 4px
  opacity: .7
  width: 24px
  transition: all ease-in-out .1s

img.copy-button:hover
  filter: contrast(1.5)

.blur
  filter: blur(12px)

.blur > .q-dialog__backdrop
  backdrop-filter: blur(12px)
</style>
