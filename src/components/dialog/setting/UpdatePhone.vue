<template>
  <q-dialog v-model='show' persistent @hide='whenHide'>
    <q-card class='dialog-box'>
      <q-card-section class='dialog-header'>
        <span>{{
            $t('account.Setting.Phone.UpdateButton')
          }}</span>
        <q-btn icon='close' flat round dense @click='emit("update:showUpdatePhone", false)' />
      </q-card-section>
      <q-card-section>
        <q-form @submit='update'>
          <div class='row send-hint'>
            <span>
              {{ $t('verificationCode.Hint.Words1') }}
              <span class='send-number'>{{ oldAccount }}</span>
              {{ $t('verificationCode.Hint.Words2') }}
            </span>
          </div>

          <send-code-input
            :verifyParam='oldAccount'
            :verifyType='oldAccountType'
            :item-target='ItemStateTarget.UpdatePhoneSendCodeOldButton'
            v-model:verify-code='oldVerifyCode'
            used-for='UPDATE'
          ></send-code-input>

          <Vue3QTelInput v-model:tel='newPhone' bg-color='blue-grey-2' outlined lazy-rules :rules='phoneRules'
                         :label="$t('input.PhoneNumber')" :required='false' :error='false' />

          <send-code-input
            :verifyParam='newPhone'
            verifyType='mobile'
            :item-target='ItemStateTarget.UpdatePhoneSendCodeButton'
            v-model:verify-code='verifyCode'
            used-for='UPDATE'
          ></send-code-input>

          <q-btn class='common-button dialog-button' type='submit'>{{
              $t('account.Setting.Phone.UpdateButton')
            }}
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang='ts'>
import { defineEmits, ref, defineProps, withDefaults, toRef, computed, watch, defineAsyncComponent } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { UpdatePhoneRequest } from 'src/store/users/types'
import { ItemStateTarget } from 'src/store/types'
import { ActionTypes } from 'src/store/users/action-types'
import { formatPhoneNumber } from 'src/utils/utils'

const SendCodeInput = defineAsyncComponent(() => import('src/components/input/SendCodeInput.vue'))
const Vue3QTelInput = defineAsyncComponent(() => import('vue3-q-tel-input'))

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

interface Props {
  showUpdatePhone: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showUpdatePhone: false
})
const show = toRef(props, 'showUpdatePhone')
const emit = defineEmits<{(e: 'update:showUpdatePhone', value: boolean): void }>()

const userInfo = computed(() => store.getters.getUserInfo)
const oldAccount = computed(() => {
  if (userInfo.value.User.PhoneNO !== '') {
    return userInfo.value.User.PhoneNO
  }
  return userInfo.value.User.EmailAddress
})
const oldAccountType = computed(() => {
  if (userInfo.value.User.EmailAddress === oldAccount.value) {
    return 'email'
  }
  return 'mobile'
})

const newPhone = ref('')
const verifyCode = ref('')
const oldVerifyCode = ref('')
const phoneRules = ref([
  (val: string) => (val && val.length > 0) || t('input.PhoneNumberWarning'),
  (val: string) => (val && val !== oldAccount.value) || t('input.OldPhoneWarning')
])

const store = useStore()

const userDialogShow = computed(() => store.getters.getUserDialogShow)
watch(userDialogShow, (n, o) => {
  if (!n && o) {
    emit('update:showUpdatePhone', false)
  }
})

const update = () => {
  const request: UpdatePhoneRequest = {
    OldAccount: formatPhoneNumber(oldAccount.value as string),
    OldAccountType: oldAccountType.value,
    OldVerificationCode: oldVerifyCode.value,
    NewPhoneNO: formatPhoneNumber(newPhone.value),
    NewPhoneVerificationCode: verifyCode.value
  }
  store.dispatch(ActionTypes.UpdatePhone, request)
}

const whenHide = () => {
  verifyCode.value = ''
  newPhone.value = ''
  oldVerifyCode.value = ''
}
</script>

<style scoped>
@import "~vue3-q-tel-input/dist/vue3-q-tel-input.esm.css";

.dialog-box {
  background-color: white;
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 24px;
  margin: 24px;
  position: relative;
  overflow-x: hidden;
  min-width: 420px;
}

.dialog-header {
  display: flex;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 34px;
  margin-left: 10px;
  color: black;
  justify-content: space-between;
}

.dialog-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  width: 100%;
}

.send-hint {
  color: #888888;
}

.send-number {
  color: #555555;
  font-weight: bold;
}
</style>
