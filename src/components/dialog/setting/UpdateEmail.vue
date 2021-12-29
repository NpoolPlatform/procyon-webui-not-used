<template>
  <q-dialog v-model='show' persistent @hide='whenHide'>
    <q-card class='dialog-box'>
      <q-card-section class='dialog-header'>
        <span>{{
            $t('account.Setting.Email.UpdateButton')
          }}</span>
        <q-btn icon='close' flat round dense @click='emit("update:showUpdateEmail", false)' />
      </q-card-section>
      <q-card-section>
        <q-form @submit='update'>
          <q-input
            outlined
            bg-color='blue-grey-2'
            class='common-input'
            :label="$t('input.OldEmailAddress')"
            v-model='oldEmail'
            disable
            lazy-rules
            :rules='emailRules' />

          <send-code-input
            :verifyParam='oldEmail'
            verifyType='email'
            v-model:verify-code='oldVerifyCode'
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
            v-model:verify-code='verifyCode'
          ></send-code-input>

          <q-btn class='common-button dialog-button' type='submit'>{{
              $t('account.Setting.Email.UpdateButton')
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
import { UpdateEmailRequest } from 'src/store/users/types'
import { RequestInput } from 'src/store/types'
import { ActionTypes } from 'src/store/users/action-types'

const SendCodeInput = defineAsyncComponent(() => import('src/components/input/SendCodeInput.vue'))

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

interface Props {
  showUpdateEmail: boolean
  emailAddress: string
}

const props = withDefaults(defineProps<Props>(), {
  showUpdateEmail: false,
  emailAddress: ''
})
const show = toRef(props, 'showUpdateEmail')
const oldEmail = toRef(props, 'emailAddress')
const emit = defineEmits<{(e: 'update:showUpdateEmail', value: boolean): void }>()

const email = ref('')
const verifyCode = ref('')
const oldVerifyCode = ref('')
const emailRules = ref([
  (val: string) => isValidEmail(val) || t('input.EmailAddressWarning'),
  (val: string) => (val && val !== oldEmail.value) || t('input.OldEmailWarning')
])

const store = useStore()

const userDialogShow = computed(() => store.getters.getUserDialogShow)
watch(userDialogShow, (n, o) => {
  if (!n && o) {
    emit('update:showUpdateEmail', false)
  }
})

const update = () => {
  const request: UpdateEmailRequest = {
    OldEmail: oldEmail.value,
    OldCode: oldVerifyCode.value,
    NewEmail: email.value,
    NewCode: verifyCode.value
  }
  const updateEmailRequest: RequestInput<UpdateEmailRequest> = {
    requestInput: request,
    messages: {
      successMessage: t('notify.UpdateEmail.Success'),
      failMessage: t('notify.UpdateEmail.Fail')
    },
    loadingContent: ''
  }
  store.dispatch(ActionTypes.UpdateEmail, updateEmailRequest)
}

const whenHide = () => {
  verifyCode.value = ''
  email.value = ''
  oldVerifyCode.value = ''
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
