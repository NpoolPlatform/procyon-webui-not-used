<template>
  <div class='form-container'>
    <div class='confirmation'>
      <h3>{{ $t(title) }}</h3>
      <h3 class="form-title">
        {{ order?.PayWithCoin.Name }} | <strong>{{ $t('MSG_ORDER_ID') }}: {{ order?.Order.Order.ID }}</strong>
      </h3>
      <div class="full-section">
        <h4>{{ $t('MSG_AMOUNT') }}:</h4>
        <span class="number">{{ order?.Order.Order.Units }}</span>
        <span class="unit">{{ order?.Good.Good.Good.Unit }}</span>
      </div>
      <div class="full-section">
        <h4>{{ $t('MSG_PAYMENT') }}:</h4>
        <span class="number">{{ order?.Order.Payment?.Amount }}</span>
        <span class="unit">{{ order?.PayWithCoin?.Unit }}</span>
      </div>
      <div class="full-section">
        <h4>{{ $t('MSG_STATUS') }}:</h4>
        <span class="number">{{ state }}</span>
      </div>
      <div v-if='showType === "date"' class="full-section">
        <h4>{{ $t('MSG_DATE') }}:</h4>
        <span class="number">{{ date.formatDate(order?.Order.Order.CreateAt as number * 1000, 'YYYY-MM-DD') }}</span>
        <span class="unit">{{ date.formatDate(order?.Order.Order.CreateAt as number * 1000, 'HH:mm:ss') }}</span>
      </div>
      <div v-if='showType === "remain"' class="full-section">
        <h4>{{ $t('MSG_TIME_REMAINING') }}:</h4>
        <span class="number">{{ remainTime }}</span>
      </div>
      <div class="hr"></div>
      <div class="warning">
        <img :src='warning'>
        <span>{{ $t(tipMessage) }}</span>
      </div>
      <button class='btn' @click='onProceedClick'>{{ $t('MSG_PROCEED_TO_DASHBOARD') }}</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useStore } from 'src/store'
import { defineProps, toRef, computed, defineEmits } from 'vue'
import { date } from 'quasar'

import warning from 'src/assets/warning.svg'

interface Props {
  orderId: string
  title: string
  tipMessage: string
  state: string
  showType: string
  remainTime: string
}

const props = defineProps<Props>()

const orderId = toRef(props, 'orderId')
const title = toRef(props, 'title')

const store = useStore()
const order = computed(() => store.getters.getOrderByID(orderId.value))

const emit = defineEmits<{(e: 'proceed'): void}>()

const onProceedClick = () => {
  emit('proceed')
}

</script>

<style lang='sass' scoped>
.form-container
  background: linear-gradient(to bottom right, #2a3943 0, #092023 100%)
  box-shadow: 16px 16px 20px 0 #101417ee
  border-radius: 12px
  color: #e1eeef
  padding: 48px
  margin: 48px auto
  min-width: 360px
  max-width: 640px
  line-height: 100%

.popup
  border-radius: 12px
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  width: 100%
  position: absolute
  top: 0
  left: 0
  z-index: 10

.form-container button
  margin: 18px 0 0 0

.confirmation h3
  margin-top: 0

.confirmation h3.form-title
  font-size: 18px
  padding: 0

.confirmation h3.form-title::after
  display: none

.confirmation button
  margin: 0 0 24px 0
  width: 100%

.form-container .full-section
  margin: 0
  width: 100%

.form-container .number
  background: linear-gradient(to bottom right, #ffe91d -50%, #ce5417 150%)
  background-clip: border-box
  filter: contrast(1.5)
  overflow-wrap: anywhere
  -webkit-background-clip: text
  -webkit-box-decoration-break: clone
  -webkit-text-fill-color: transparent

.form-container .unit
  color: #e4f4f0
  filter: contrast(1.5)
  font-size: 16px
  font-weight: 700

.form-container span
  font-size: 28px

.confirmation h3
  margin-top: 0
  line-height: 100%

.confirmation h3.form-title
  font-size: 18px
  padding: 0

.confirmation h3.form-title::after
  display: none

.form-container h4
  font-size: 18px
  font-weight: 400
  margin: 12px 0 4px 0
  text-transform: unset

.form-container label[for="agreement"]
  font-size: 16px
  font-weight: 400
  opacity: .7

.warning
  align-items: center
  border: 1px solid #1ec498
  border-radius: 18px
  display: flex
  font-size: 16px
  font-weight: 600
  padding: 8px

.warning img
  filter: invert(100%) opacity(.8)
  margin: 0 8px 0 0
  height: 24px
  width: 24px

.warning span
  font-size: 12px
  font-weight: 600

.confirmation .btn
  margin: 18px 0 24px 0
  width: 100%

.form-container .btn
  margin: 18px 0 0 0

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

button.in-active
  filter: saturate(0) contrast(.7)

.hr
  margin: 24px 0
</style>
