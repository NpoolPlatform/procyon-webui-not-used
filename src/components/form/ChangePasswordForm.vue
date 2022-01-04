<template>
  <q-form @submit='changePassword'>
    <Vue3QTelInput
      v-if='showPhone'
      v-model:tel='changePasswordInput.phoneNumber'
      bg-color='blue-grey-2'
      outlined
      lazy-rules
      :rules='phoneNumberRule'
      :label="$t('input.PhoneNumber')"
      :required='false'
      :error='false'
      class='common-input' />
    <q-input
      v-if='showEmail'
      bg-color='blue-grey-2'
      class='common-input'
      outlined
      disable
      v-model='userBasicInfo.EmailAddress'
      :label="$t('input.EmailAddress')"
      lazy-rules
      :rules='emailRule'
    ></q-input>

    <SendCodeInput v-if='showEmail' verify-type='email' v-model:verify-code='verifyCode'
                   :verify-param='userBasicInfo.EmailAddress'
                   :item-target='ItemStateTarget.ChangePasswordEmailSendCodeButton' />
    <SendCodeInput v-if='showPhone' verify-type='phone' v-model:verify-code='verifyCode'
                   :verify-param='changePasswordInput.phoneNumber'
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
          @click='isOPwd = !isPwd'
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
import { formatPhoneNumber, isValidEmail, isValidPassword, sha256Password, ThrottleDelay } from 'src/utils/utils'
import { useI18n } from 'vue-i18n'
import { throttle } from 'quasar'
import { useStore } from 'src/store'
import { UserChangePasswordRequest } from 'src/store/users/types'
import { ItemStateTarget } from 'src/store/types'
import { ActionTypes } from 'src/store/users/action-types'

const SendCodeInput = defineAsyncComponent(() => import('src/components/input/SendCodeInput.vue'))
const Vue3QTelInput = defineAsyncComponent(() => import('vue3-q-tel-input'))

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const store = useStore()
const showEmail = computed(() => store.getters.getShowEmail)
const showPhone = computed(() => store.getters.getShowPhone)
const userBasicInfo = computed(() => store.getters.getUserBasicInfo)

const verifyCode = ref('')
const isPwd = ref(true)
const isCPwd = ref(true)
const isOPwd = ref(true)

const changePasswordInput = reactive({
  phoneNumber: '',
  emailAddress: '',
  oldPassword: '',
  password: '',
  confirmPassword: ''
})

const phoneNumberRule = ref([
  (val: string) => (val && val.length > 0) || t('input.PhoneNumberWarning')
])
const emailRule = ref([
  (val: string) => isValidEmail(val) || t('input.EmailAddressWarning')
])
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
    verifyParam = userBasicInfo.value.EmailAddress
  } else if (showPhone.value) {
    type = 'phone'
    verifyParam = formatPhoneNumber(changePasswordInput.phoneNumber)
  }

  const request: UserChangePasswordRequest = {
    VerifyParam: verifyParam,
    VerifyType: type,
    OldPassword: sha256Password(changePasswordInput.oldPassword),
    Password: sha256Password(changePasswordInput.password),
    Code: verifyCode.value
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
</style>
