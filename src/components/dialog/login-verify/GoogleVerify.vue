<template>
  <q-dialog v-model='show' persistent>
    <q-card class='common-card-container' style='background: #23292b !important;'>
      <q-card-section>
        <span class='common-card-title'>{{ $t('dialog.GoogleVerify.Title') }}</span>
      </q-card-section>

      <q-card-section class='card-content'>
        {{ $t('dialog.GoogleVerify.Content') }}
      </q-card-section>

      <q-card-section>
        <q-form @submit='verifyEmailCode'>
          <q-input
            :rules='verifyCodeRules'
            lazy-rules
            bg-color='blue-grey-2'
            class='common-input'
            outlined
            v-model='verifyCode'
            :label="$t('input.VerifyCode')"
          ></q-input>
          <q-btn class='common-button verify-button' type='submit' :label='$t("button.Verify")'></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults, defineEmits, ref, toRef, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { throttle } from 'quasar'
import { ActionTypes } from 'src/store/verify/action-types'
import { VerifyGoogleAuthenticationCodeRequest } from 'src/store/verify/types'
import { RequestInput } from 'src/store/types'
import { MutationTypes } from 'src/store/users/mutation-types'
import { useRouter } from 'vue-router'

interface Props {
  showGoogle: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showGoogle: false
})
const show = toRef(props, 'showGoogle')
const emit = defineEmits<{(e: 'update:showGoogle', value: boolean): void }>()

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const router = useRouter()

const store = useStore()

const verifyCode = ref('')

const verifyCodeRules = ref([
  (val: string) => (val && val.length > 0) || t('input.VerifyCodeWarning')
])

const verifyEmailCode = throttle((): void => {
  const request: VerifyGoogleAuthenticationCodeRequest = {
    UserID: '',
    Code: verifyCode.value
  }
  const verifyGoogleAuthenticationCodeRequest: RequestInput<VerifyGoogleAuthenticationCodeRequest> = {
    requestInput: request,
    messages: {
      successMessage: t('notify.VerifyGoogleAuthentication.Success'),
      failMessage: t('notify.VerifyGoogleAuthentication.Fail')
    },
    loadingContent: t('notify.VerifyGoogleAuthentication.Load')
  }
  store.dispatch(ActionTypes.VerifyGoogleAuthentication, verifyGoogleAuthenticationCodeRequest)
}, 1000)

onMounted(() => {
  store.subscribe((mutation, state) => {
    if (mutation.type === MutationTypes.SetLoginVerify) {
      if (state.user.loginVerify) {
        emit('update:showGoogle', false)
        void router.push('/account')
      }
    }
  })
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
}
</style>
