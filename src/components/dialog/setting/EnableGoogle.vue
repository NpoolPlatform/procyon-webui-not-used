<template>
  <q-dialog v-model='show' persistent>
    <q-card class='dialog-box'>
      <q-card-section class='dialog-header'>
        <span>{{
            $t('account.Setting.Google.Title')
          }}</span>
        <q-btn icon='close' flat round dense @click='emit("update:showGoogle", false)' />
      </q-card-section>

      <q-card-section style='text-align: center;'>
        <q-img class='img-style' :src='userGoogleInfo.qrCodeURL'></q-img>
      </q-card-section>

      <q-card-section
        class='img-section-style text-black'
        style='font-weight: 600'
      >
        Google Secret: {{ userGoogleInfo.secret }}
      </q-card-section>

      <q-card-section class='text-black'>
        <p>{{ $t('GoogleAuthentication.Content1') }}</p>
        <p>{{ $t('GoogleAuthentication.Content2') }}</p>
        <p>{{ $t('GoogleAuthentication.Content3') }}</p>
        <p>{{ $t('GoogleAuthentication.L1') }}</p>
        <p>{{ $t('GoogleAuthentication.L2') }}</p>
        <p>{{ $t('GoogleAuthentication.L3') }}</p>
        <p>{{ $t('GoogleAuthentication.L4') }}</p>
      </q-card-section>

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
import { defineEmits, defineProps, toRef, withDefaults, watch, computed, ref } from 'vue'
import { useStore } from 'src/store'
import { UpdateUserGAStatusRequest } from 'src/store/users/types'
import { RequestInput } from 'src/store/types'
import { ActionTypes } from 'src/store/users/action-types'
import { useI18n } from 'vue-i18n'

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
  const request: UpdateUserGAStatusRequest = {
    Status: true
  }
  const updateUserGAStatusRequest: RequestInput<UpdateUserGAStatusRequest> = {
    requestInput: request,
    messages: {
      successMessage: t('notify.UpdateGoogleStatus.Success'),
      failMessage: t('notify.UpdateGoogleStatus.Fail')
    },
    loadingContent: ''
  }
  store.dispatch(ActionTypes.UpdateUserGAStatus, updateUserGAStatusRequest)
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
  max-height: 750px;
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
</style>
