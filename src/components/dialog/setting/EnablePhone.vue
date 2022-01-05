<template>
  <q-dialog v-model='show' persistent @hide='whenHide'>
    <q-card class='dialog-box'>
      <q-card-section class='dialog-header'>
        <span>{{
            $t('account.Setting.Phone.EnableButton')
          }}</span>
        <q-btn icon='close' flat round dense @click='emit("update:showEnablePhone", false)' />
      </q-card-section>
      <q-form @submit='enable'>
        <Vue3QTelInput v-model:tel='phoneNumber' bg-color='blue-grey-2' outlined lazy-rules :rules='phoneRules'
                       :label="$t('input.PhoneNumber')" :required='false' :error='false' />
        <send-code-input
          :verifyParam='phoneNumber'
          verifyType='phone'
          :item-target='ItemStateTarget.EnablePhoneSendCodeButton'
          v-model:verify-code='verifyCode'
        ></send-code-input>

        <q-btn class='common-button dialog-button' type='submit'>{{
            $t('account.Setting.Phone.EnableButton')
          }}
        </q-btn>
      </q-form>

      <q-card-section></q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang='ts'>
import { defineEmits, ref, defineProps, withDefaults, toRef, computed, watch, defineAsyncComponent } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { EnablePhoneRequest } from 'src/store/users/types'
import { ItemStateTarget } from 'src/store/types'
import { ActionTypes } from 'src/store/users/action-types'
import { formatPhoneNumber } from 'src/utils/utils'

const SendCodeInput = defineAsyncComponent(() => import('src/components/input/SendCodeInput.vue'))
const Vue3QTelInput = defineAsyncComponent(() => import('vue3-q-tel-input'))

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

interface Props {
  showEnablePhone: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showEnablePhone: false
})
const show = toRef(props, 'showEnablePhone')
const emit = defineEmits<{(e: 'update:showEnablePhone', value: boolean): void }>()

const verifyCode = ref('')
const phoneNumber = ref('')
const phoneRules = ref([
  (val: string) => (val && val.length > 0) || t('input.PhoneNumberWarning')
])

const store = useStore()

const userDialogShow = computed(() => store.getters.getUserDialogShow)
watch(userDialogShow, (n, o) => {
  if (!n && o) {
    emit('update:showEnablePhone', false)
  }
})

const enable = () => {
  const request: EnablePhoneRequest = {
    PhoneNumber: formatPhoneNumber(phoneNumber.value),
    Code: verifyCode.value
  }
  store.dispatch(ActionTypes.EnablePhone, request)
}

const whenHide = () => {
  verifyCode.value = ''
  phoneNumber.value = ''
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
