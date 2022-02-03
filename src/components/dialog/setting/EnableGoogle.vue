<template>
  <q-dialog v-model='show' persistent>
    <q-card class='dialog-box'>
      <q-card-section>
        <div class='dialog-header'>
          <span>{{
              $t('account.Setting.Google.Title')
            }}</span>
          <q-btn icon='close' flat round dense @click='emit("update:showGoogle", false)' />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class='scroll' style='max-height: 750px;'>
        <div class='text-black'>
          <div style='text-align: center; margin-bottom: 10px;'>
            <qrcode-vue :value='userGoogleInfo.OTPAuth' :size='250' />
          </div>
          <div class='secret-style text-black'>
            Google Secret: {{ userGoogleInfo.Secret }}
          </div>

          <q-separator />

          <div>
            <p>{{ $t('GoogleAuthentication.Content1') }}</p>
            <p>{{ $t('GoogleAuthentication.Content2') }}</p>
            <p>{{ $t('GoogleAuthentication.Content3') }}</p>
            <p>{{ $t('GoogleAuthentication.L1') }}</p>
            <p>{{ $t('GoogleAuthentication.L2') }}</p>
            <p>{{ $t('GoogleAuthentication.L3') }}</p>
            <p>{{ $t('GoogleAuthentication.L4') }}</p>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align='right' class='text-primary'>
        <q-btn
          flat
          :label="$t('GoogleAuthentication.NextStepBtn')"
          @click='showVerifyDialog = true'
        />
        <q-btn
          flat
          :label="$t('GoogleAuthentication.CloseBtn')"
          @click='emit("update:showGoogle", false)'
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model='showVerifyDialog' persistent>
    <q-card>
      <q-card-section class='dialog-header'>
        <div>{{ $t('account.Setting.Google.Title') }}</div>
        <q-btn icon='close' flat round dense @click='showVerifyDialog = false' />
      </q-card-section>
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
  </q-dialog>
</template>

<script setup lang='ts'>
import { defineEmits, defineProps, toRef, withDefaults, watch, computed, ref, defineAsyncComponent } from 'vue'
import { useStore } from 'src/store'
import { ActionTypes } from 'src/store/verify/action-types'
import { useI18n } from 'vue-i18n'
import { VerifyGoogleAuthenticationCodeRequest } from 'src/store/verify/types'

const QrcodeVue = defineAsyncComponent(() => import('qrcode.vue'))

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

interface Props {
  showGoogle: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showGoogle: false
})
const show = toRef(props, 'showGoogle')
const emit = defineEmits<{(e: 'update:showGoogle', value: boolean): void }>()

const showVerifyDialog = ref(false)
const googleVerifyCode = ref('')

const store = useStore()

const userGoogleInfo = computed(() => store.getters.getGoogleAuthenticationInfo)

const userDialogShow = computed(() => store.getters.getUserDialogShow)

watch(userDialogShow, (n, o) => {
  if (!n && o) {
    emit('update:showGoogle', false)
    showVerifyDialog.value = false
  }
})

const verifyCodeRules = ref([
  (val: string) => (val && val.length > 0) || t('input.VerifyCodeWarning')
])

const bindGoogleAuthenticator = () => {
  const request: VerifyGoogleAuthenticationCodeRequest = {
    Code: googleVerifyCode.value,
    Bind: true
  }
  store.dispatch(ActionTypes.VerifyGoogleAuthentication, request)
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

.content-style {
  color: black;
  font-weight: 600;
  font-size: 18px;
}

.img-style {
  width: 200px;
  height: 200px;
  text-align: center;
}

.secret-style {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}
</style>
