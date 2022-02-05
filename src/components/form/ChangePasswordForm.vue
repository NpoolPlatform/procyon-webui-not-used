<template>
  <q-form @submit='changePassword'>
    <div class='row send-hint'>
      <span>
        {{ $t('verificationCode.Hint.Words1') }}
        <span class='send-number'>{{ accountNumber }}</span>
        {{ $t('verificationCode.Hint.Words2') }}
      </span>
    </div>

    <SendCodeInput v-if='showEmail' verify-type='email' v-model:verify-code='verifyCode'
                   :verify-param='accountNumber' used-for='UPDATE'
                   :item-target='ItemStateTarget.ChangePasswordEmailSendCodeButton' />
    <SendCodeInput v-if='showPhone' verify-type='mobile' v-model:verify-code='verifyCode'
                   :verify-param='accountNumber' used-for='UPDATE'
                   :item-target='ItemStateTarget.ChangePasswordPhoneSendCodeButton' />
    <q-input v-model='changePasswordInput.oldPassword' :label="$t('input.OldPassword')" bg-color='blue-grey-2'
             class='common-input'
             outlined lazy-rules
             :rules='oldPasswordRules'
             :type="isOPwd ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="isOPwd ? 'visibility_off' : 'visibility'"
          class='cursor-pointer'
          @click='isOPwd = !isOPwd'
        />
      </template>
    </q-input>
    <q-input v-model='changePasswordInput.password' :label="$t('input.Password')" bg-color='blue-grey-2'
             class='common-input'
             outlined lazy-rules
             :rules='passwordRules'
             :type="isPwd ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class='cursor-pointer'
          @click='isPwd = !isPwd'
        />
      </template>
    </q-input>
    <q-input v-model='changePasswordInput.confirmPassword' :label="$t('input.ConfirmPassword')" bg-color='blue-grey-2'
             class='common-input'
             outlined lazy-rules
             :rules='confirmPasswordRules'
             :type="isCPwd ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="isCPwd ? 'visibility_off' : 'visibility'"
          class='cursor-pointer'
          @click='isCPwd = !isCPwd'
        />
      </template>
    </q-input>
    <q-btn type='submit' class='common-button change-password-button' :label="$t('button.Confirm')"></q-btn>
  </q-form>
</template>

<script setup lang='ts'>
import { reactive, ref, defineAsyncComponent, computed } from 'vue'
import { formatPhoneNumber, isValidPassword, sha256Password, ThrottleDelay } from 'src/utils/utils'
import { useI18n } from 'vue-i18n'
import { throttle } from 'quasar'
import { useStore } from 'src/store'
import { ItemStateTarget } from 'src/store/types'
import { ActionTypes } from 'src/store/users/action-types'
import { UserUpdatePasswordByAppUserRequest } from 'src/store/users/types'

const SendCodeInput = defineAsyncComponent(() => import('src/components/input/SendCodeInput.vue'))
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const store = useStore()
const showEmail = computed(() => store.getters.getShowEmail)
const showPhone = computed(() => store.getters.getShowPhone)
const userInfo = computed(() => store.getters.getUserInfo)

const accountNumber = computed(() => {
  if (showEmail.value) {
    return userInfo.value.User.EmailAddress
  }
  if (showPhone.value) {
    return userInfo.value.User.PhoneNO
  }
  return ''
})

const verifyCode = ref('')
const isPwd = ref(true)
const isCPwd = ref(true)
const isOPwd = ref(true)

const changePasswordInput = reactive({
  oldPassword: '',
  password: '',
  confirmPassword: ''
})

const passwordRules = ref([
  (val: string) => isValidPassword(val) || t('input.PasswordWarning')
])
const confirmPasswordRules = ref([
  (val: string) => isValidPassword(val) || t('input.PasswordWarning'),
  (val: string) => (val && val === changePasswordInput.password) || t('input.ConfirmPasswordWarning')
])
const oldPasswordRules = ref([
  (val: string) => (val && val.length > 0) || t('input.OldPasswordWarning')
])

const changePassword = throttle(() => {
  let type = ''
  let verifyParam = ''
  if (showEmail.value) {
    type = 'email'
    verifyParam = userInfo.value.User.EmailAddress as string
  } else if (showPhone.value) {
    type = 'mobile'
    verifyParam = formatPhoneNumber(userInfo.value.User.PhoneNO as string)
  }

  const request: UserUpdatePasswordByAppUserRequest = {
    Account: verifyParam,
    AccountType: type,
    OldPasswordHash: sha256Password(changePasswordInput.oldPassword),
    PasswordHash: sha256Password(changePasswordInput.password),
    VerificationCode: verifyCode.value
  }
  store.dispatch(ActionTypes.UserChangePassword, request)
}, ThrottleDelay)
</script>

<style scoped>
@import "~vue3-q-tel-input/dist/vue3-q-tel-input.esm.css";

.change-password-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 1px solid #ff964a;
  margin: 0 0 10px 0;
  width: 100%;
}

.send-hint {
  color: #bbbbbb;
}

.send-number {
  color: #cccccc;
  font-weight: bold;
}
</style>
