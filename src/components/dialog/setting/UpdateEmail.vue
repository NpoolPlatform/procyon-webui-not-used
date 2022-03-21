<template>
  <q-card class='dialog-box'>
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
          :item-target='ItemStateTarget.UpdateEmailSendCodeOldButton'
          v-model:verify-code='oldVerifyCode'
          used-for='UPDATE'
        ></send-code-input>

        <q-input
          outlined
          bg-color='blue-grey-2'
          class='common-input'
          :label="$t('input.EmailAddress')"
          v-model='email'
          lazy-rules
          :rules='emailRules' />

        <send-code-input
          :verifyParam='email'
          verifyType='email'
          :item-target='ItemStateTarget.UpdateEmailSendCodeButton'
          v-model:verify-code='verifyCode'
          used-for='UPDATE'
        ></send-code-input>

        <q-btn class='common-button dialog-button' type='submit'>{{
            $t('account.Setting.Email.UpdateButton')
          }}
        </q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang='ts'>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useStore } from 'src/store'
import { isValidEmail } from 'src/utils/utils'
import { useI18n } from 'vue-i18n'
import { UpdateEmailRequest } from 'src/store/users/types'
import { ItemStateTarget } from 'src/store/types'
import { ActionTypes } from 'src/store/users/action-types'
import { useRouter } from 'src/router'

const SendCodeInput = defineAsyncComponent(() => import('src/components/input/SendCodeInput.vue'))

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const store = useStore()

const userInfo = computed(() => store.getters.getUserInfo)
const oldAccount = computed(() => {
  if (userInfo.value.User.EmailAddress !== '') {
    return userInfo.value.User.EmailAddress
  }
  return userInfo.value.User.PhoneNO
})
const oldAccountType = computed(() => {
  if (userInfo.value.User.EmailAddress === oldAccount.value) {
    return 'email'
  }
  return 'mobile'
})

const email = ref('')
const verifyCode = ref('')
const oldVerifyCode = ref('')
const emailRules = ref([
  (val: string) => isValidEmail(val) || t('input.EmailAddressWarning'),
  (val: string) => (val && val !== oldAccount.value) || t('input.OldEmailWarning')
])

const router = useRouter()

const update = () => {
  const request: UpdateEmailRequest = {
    OldAccount: oldAccount.value as string,
    OldAccountType: oldAccountType.value,
    OldVerificationCode: oldVerifyCode.value,
    NewEmailAddress: email.value,
    NewEmailVerificationCode: verifyCode.value
  }
  store.dispatch(ActionTypes.UpdateEmail, request)

  void router.push({ path: '/dashboard' })
}
</script>

<style scoped>
.dialog-box {
  background-color: transparent;
  box-shadow: none;
  border-radius: 12px;
  position: relative;
  overflow-x: hidden;
}

.dialog-header {
  display: flex;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 34px;
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
  color: #bbbbbb;
}

.send-number {
  color: #cccccc;
  font-weight: bold;
}
</style>
