<template>
  <q-dialog v-model='show' persistent>
    <q-card class='common-card-container' style='background: #23292b !important;'>
      <q-card-section>
        <span class='common-card-title'>{{ $t('dialog.EmailVerify.Title') }}</span>
      </q-card-section>

      <q-card-section class='card-content'>
        {{ $t('dialog.EmailVerify.Content1')
        }}<span style='font-weight: bolder'>{{ userBasicInfo.EmailAddress }}</span>,{{ $t('dialog.EmailVerify.Content3')
        }}
      </q-card-section>

      <q-card-section>
        <q-form @submit='verifyEmailCode'>
          <q-input
            disable
            bg-color='blue-grey-2'
            class='common-input'
            outlined
            :label='$t("input.EmailAddress")'
            v-model='userBasicInfo.EmailAddress'>
          </q-input>
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
import { defineProps, withDefaults, defineEmits, ref, computed, toRef, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { throttle } from 'quasar'
import { ActionTypes } from 'src/store/verify/action-types'
import { VerifyCodeWithUserIDRequest } from 'src/store/verify/types'
import { RequestInput } from 'src/store/types'
import { MutationTypes } from 'src/store/users/mutation-types'
import { useRouter } from 'vue-router'

interface Props {
  showEmail: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showEmail: false
})
const show = toRef(props, 'showEmail')
const emit = defineEmits<{(e: 'update:showEmail', value: boolean): void }>()

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const router = useRouter()

const store = useStore()
const userBasicInfo = computed(() => store.getters.getUserBasicInfo)

const verifyCode = ref('')

const verifyCodeRules = ref([
  (val: string) => (val && val.length > 0) || t('input.VerifyCodeWarning')
])

const verifyEmailCode = throttle((): void => {
  const request: VerifyCodeWithUserIDRequest = {
    UserID: '',
    Param: userBasicInfo.value.EmailAddress,
    Code: verifyCode.value
  }
  const verifyCodeWithUserIDRequest: RequestInput<VerifyCodeWithUserIDRequest> = {
    requestInput: request,
    messages: {
      successMessage: t('notify.VerifyWithUserID.Success'),
      failMessage: t('notify.VerifyWithUserID.Fail')
    },
    loadingContent: t('notify.VerifyWithUserID.Load')
  }
  store.dispatch(ActionTypes.VerifyCodeWithUserID, verifyCodeWithUserIDRequest)
}, 1000)

onMounted(() => {
  store.subscribe((mutation, state) => {
    if (mutation.type === MutationTypes.SetLoginVerify) {
      if (state.user.loginVerify) {
        emit('update:showEmail', false)
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
