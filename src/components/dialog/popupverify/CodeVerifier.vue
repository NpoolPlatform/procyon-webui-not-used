<template>
  <q-card class='common-card-container' style='background: #23292b !important;'>
    <q-card-section>
      <span class='common-card-title' v-if='verifyMethod === VerifyMethod.VerifyByEmail'>
        {{ t('dialog.EmailVerify.Title') }}
      </span>
      <span class='common-card-title' v-else-if='verifyMethod === VerifyMethod.VerifyByGoogle'>
        {{ t('dialog.GoogleVerify.Title') }}
      </span>
    </q-card-section>

    <slot name='content'></slot>
    <q-card-section v-if='verifyMethod === VerifyMethod.VerifyByEmail'>
      {{ $t('dialog.EmailVerify.Content1')
      }}<span style='font-weight: bolder'>{{ emailAddress
      }}</span>, {{ $t('dialog.EmailVerify.Content3')
      }}
    </q-card-section>
    <q-card-section v-else-if='verifyMethod === VerifyMethod.VerifyByGoogle'>
      {{ $t('login.GoogleVerifyContent') }}
    </q-card-section>

    <q-form @submit="$emit('verify', myVerifyCode)">
      <q-card-section v-if='verifyMethod === VerifyMethod.VerifyByEmail'>
        <q-input
          disable
          bg-color='blue-grey-2'
          class='common-input'
          outlined
          :label='$t("input.EmailAddress")'
          v-model='emailAddress'>
        </q-input>
      </q-card-section>
      <q-card-section v-if='verifyMethod === VerifyMethod.VerifyByGoogle'>
        <q-input
          :rules='verifyCodeRules'
          lazy-rules
          bg-color='blue-grey-2'
          class='common-input'
          outlined
          v-model='myVerifyCode'
          :label="$t('input.VerifyCode')"
        ></q-input>
      </q-card-section>
      <q-btn class='common-button verify-button' type='submit' :label='$t("button.Verify")'></q-btn>
    </q-form>
  </q-card>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults, defineEmits, ref, toRef, watch, computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { VerifyMethod } from 'src/store/users/const'

interface Props {
  verifyCode: string
  verifyBy?: VerifyMethod
}

const props = withDefaults(defineProps<Props>(), {
  verifyCode: ''
})
const verifyCode = toRef(props, 'verifyCode')
const verifyBy = toRef(props, 'verifyBy')
const myVerifyCode = ref(verifyCode.value)

const emit = defineEmits<{(e: 'update:verifyCode', verifyCode: string): void,
  (e: 'verify', value: string): void,
  (e: 'update:verifyBy', verifyBy: string): void
}>()

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const store = useStore()

const emailAddress = computed(() => store.getters.getUserInfo.User.EmailAddress)
const googleAuthenticated = computed(() => store.getters.getUserInfo.Ctrl.GoogleAuthenticationVerified)
const phoneNO = computed(() => store.getters.getUserInfo.User.PhoneNO)

const verifyMethod = ref(VerifyMethod.VerifyNone)
const updateVerifyMethod = () => {
  if (verifyBy.value && verifyBy.value.length > 0 && verifyBy.value !== VerifyMethod.VerifyNone) {
    verifyMethod.value = verifyBy.value
    return
  }
  if (googleAuthenticated.value) {
    verifyMethod.value = VerifyMethod.VerifyByGoogle
    return
  }
  if (emailAddress.value && emailAddress.value.length > 0) {
    verifyMethod.value = VerifyMethod.VerifyByEmail
    return
  }
  if (phoneNO.value && phoneNO.value.length > 0) {
    verifyMethod.value = VerifyMethod.VerifyByMobile
    return
  }
  return VerifyMethod.VerifyNone
}

watch(emailAddress, () => updateVerifyMethod())
watch(googleAuthenticated, () => updateVerifyMethod())
watch(phoneNO, () => updateVerifyMethod())

const verifyCodeRules = ref([
  (val: string) => (val && val.length > 0) || t('input.VerifyCodeWarning')
])

watch(myVerifyCode, () => {
  emit('update:verifyCode', myVerifyCode.value)
})
watch(verifyMethod, () => {
  emit('update:verifyBy', verifyMethod.value)
})

onMounted(() => {
  updateVerifyMethod()
})

</script>

<style scoped>
.card-content {
  margin: 10px 10px 0 10px;
  padding: 0 0 0 0;
  color: #e1eeef;
  font-size: 18px;
}

.verify-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 1px solid #ff964a;
  margin: 0 0 10px 0;
  width: 100%;
  text-align: center;
}
</style>
