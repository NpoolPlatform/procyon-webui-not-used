<template>
  <q-page class='container'>
    <q-btn class='back-button' @click='onBackClick'>⭠</q-btn>
    <div class='content'>
      <div class='form-container'>
        <div class='confirmation'>
          <h3>{{ $t(title) }}</h3>
          <p>{{ $t(caption) }}</p>
          <div class='hr'></div>
          <button @click='onSetupClick'>{{ $t(confirmText) }}</button>
          <button @click='onCancelClick' class='alt'>{{ $t('MSG_SETUP_LATER') }}</button>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang='ts'>
import { useStore } from 'src/store'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { ModuleKey } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notificationPop, notify } from 'src/store/notifications/helper'

import { useRouter } from 'src/router'

const router = useRouter()
const store = useStore()

const onBackClick = () => {
  router.back()
}

type MyFunction = () => void
const unsubscribe = ref<MyFunction>()

const userInfo = computed(() => store.getters.getUserInfo)
const kyc = computed(() => store.getters.getKYCInfo)

const title = ref('')
const caption = ref('')
const confirmText = ref('')

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

  if (!userInfo.value.User.PhoneNO || userInfo.value.User.PhoneNO.length === 0) {
    title.value = 'MSG_ADD_MOBILE_NUMBER'
    caption.value = 'MSG_ADD_MOBILE_NUMBER_TIPS'
    confirmText.value = 'MSG_SETUP_MOBILE_NUMBER'
  } else if (!kyc.value.Kyc) {
    title.value = 'MSG_SETUP_KYC'
    caption.value = 'MSG_SETUP_KYC_TIPS'
    confirmText.value = 'MSG_PROCEED_TO_KYC_SETUP'
  } else if (!userInfo.value.Ctrl || !userInfo.value.Ctrl.GoogleAuthenticationVerified) {
    title.value = 'MSG_SETUP_GOOGLE_AUTHENTICATOR'
    caption.value = 'MSG_SETUP_GOOGLE_AUTHENTICATOR_TIPS'
    confirmText.value = 'MSG_SETUP_TWO_FACTOR_AUTH'
  } else {
    void router.push({ path: '/dashboard' })
  }
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const onSetupClick = () => {
  // TODO
}

const onCancelClick = () => {
  void router.push({ path: '/dashboard' })
}

</script>

<style lang='sass' scoped>
.form-container
  background: linear-gradient(to bottom right, rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%)
  box-shadow: 16px 16px 20px 0 #23292b
  border-radius: 12px
  color: #e1eeef
  padding: 48px
  margin: 48px auto
  min-width: 360px
  max-width: 480px
  line-height: 100%

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
