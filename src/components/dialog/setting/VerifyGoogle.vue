<template>
  <q-card class='dialog-box'>
    <q-card-section>
      <div class='content-style'>{{ $t('account.Setting.Google.VerifyContent') }}</div>
    </q-card-section>
    <q-card-section>
      <q-form @submit='bindGoogleAuthenticator'>
        <q-input :label="$t('input.VerifyCode')" outlined lazy-rules :rules='verifyCodeRules' class='common-input'
                  bg-color='blue-grey-2'
                  v-model='googleVerifyCode'></q-input>
        <q-btn class='common-button dialog-button' :label="$t('button.Verify')" type='submit' />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang='ts'>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'src/store'
import { ActionTypes } from 'src/store/verify/action-types'
import { useI18n } from 'vue-i18n'
import { VerifyGoogleAuthenticationCodeRequest } from 'src/store/verify/types'
import { useRouter } from 'src/router'
import { MutationTypes } from 'src/store/users/mutation-types'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const googleVerifyCode = ref('')

const store = useStore()

const verifyCodeRules = ref([
  (val: string) => (val && val.length > 0) || t('input.VerifyCodeWarning')
])

const router = useRouter()

const bindGoogleAuthenticator = () => {
  const request: VerifyGoogleAuthenticationCodeRequest = {
    Code: googleVerifyCode.value
  }
  store.dispatch(ActionTypes.VerifyGoogleAuthentication, request)
}

type FunctionVoid = () => void
const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === MutationTypes.SetGoogleAuthenticationVerified) {
      void router.push({ path: '/dashboard' })
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>

<style scoped>
.dialog-box {
  background-color: transparent;
  box-shadow: none;
  color: #e1eeef;
  line-height: 100%;
  max-width: 760px;
  padding: 0
}

p {
  line-height: 150% !important;
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

.content-style {
  font-weight: 600;
  font-size: 18px;
}

.img-style {
  background-color: white;
  width: 200px;
  height: 200px;
  padding: 10px;
  text-align: center;
}

.secret-style {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.tip {
  padding-top: 24px;
}
</style>
