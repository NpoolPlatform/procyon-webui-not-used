<template>
  <q-dialog v-model='show' persistent @hide='whenHide'>
    <q-card class='dialog-box'>
      <q-card-section class='dialog-header'>
        <span>{{
            $t('account.Setting.Email.EnableButton')
          }}</span>
        <q-btn icon='close' flat round dense @click='emit("update:showEnableEmail", false)' />
      </q-card-section>
      <q-card-section>
        <q-form @submit='enable'>
          <q-input
            outlined
            bg-color='blue-grey-2'
            class='common-input'
            :label="$t('input.EmailAddress')"
            v-model='emailAddress'
            lazy-rules
            :rules='emailRules' />

          <send-code-input
            :verifyParam='emailAddress'
            verifyType='email'
            :item-target='ItemStateTarget.EnableEmailSendCodeButton'
            v-model:verify-code='verifyCode'
          ></send-code-input>

          <q-btn class='common-button dialog-button' type='submit'>{{
              $t('account.Setting.Email.EnableButton')
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
import { isValidEmail } from 'src/utils/utils'
import { useI18n } from 'vue-i18n'
import { EnableEmailRequest } from 'src/store/users/types'
import { RequestInput, ItemStateTarget } from 'src/store/types'
import { ActionTypes } from 'src/store/users/action-types'

const SendCodeInput = defineAsyncComponent(() => import('src/components/input/SendCodeInput.vue'))

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

interface Props {
  showEnableEmail: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showEnableEmail: false
})
const show = toRef(props, 'showEnableEmail')
const emit = defineEmits<{(e: 'update:showEnableEmail', value: boolean): void }>()

const verifyCode = ref('')
const emailAddress = ref('')
const emailRules = ref([
  (val: string) => isValidEmail(val) || t('input.EmailAddressWarning')
])

const store = useStore()

const userDialogShow = computed(() => store.getters.getUserDialogShow)
watch(userDialogShow, (n, o) => {
  if (!n && o) {
    emit('update:showEnableEmail', false)
  }
})

const enable = () => {
  const request: EnableEmailRequest = {
    EmailAddress: emailAddress.value,
    Code: verifyCode.value
  }
  const enableEmailRequest: RequestInput<EnableEmailRequest> = {
    requestInput: request,
    messages: {
      successMessage: t('notify.EnableEmail.Success'),
      failMessage: t('notify.EnableEmail.Fail')
    },
    loadingContent: ''
  }
  store.dispatch(ActionTypes.EnableEmail, enableEmailRequest)
}

const whenHide = () => {
  verifyCode.value = ''
  emailAddress.value = ''
}
</script>

<style scoped>
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
  margin-bottom: 10px;
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
</style>
