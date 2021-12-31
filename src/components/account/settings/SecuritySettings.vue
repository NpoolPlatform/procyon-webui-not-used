<template>
  <div class='setting-flex'>
    <div class='setting-column'>
      <SettingBox :title="$t('account.Setting.ChangePassword.Title')" :img='changePasswordImg'
                  :content="$t('account.Setting.ChangePassword.ChangePasswordContent')">
        <template v-slot:button>
          <q-btn class='common-button card-button' :label="$t('account.Setting.ChangePassword.Button')"
                 @click='$router.push("/change/password")' />
        </template>
      </SettingBox>

      <SettingBox :title="$t('account.Setting.Email.Title')" :img='emailImg'
                  :content="$t('account.Setting.Email.EmailContent')">
        <template v-slot:verify-content>
          <div class='verify-content'>
            <q-img class='verify-img' :src='emailAddress !== "" ? passImg : notPassImg'></q-img>
            <span>{{ emailAddress !== '' ? $t('account.Setting.Verify') : $t('account.Setting.NotVerify') }}</span>
          </div>
        </template>

        <template v-slot:button>
          <div>
            <q-btn class='common-button card-button' v-if='emailAddress !== ""'
                   :label="$t('account.Setting.Email.UpdateButton')" @click='showUpdateEmail = true' />
            <q-btn class='common-button card-button' v-if='emailAddress === ""'
                   :label="$t('account.Setting.Email.EnableButton')" @click='showEnableEmail = true' />
          </div>
        </template>
      </SettingBox>
    </div>

    <div class='setting-column'>
      <SettingBox :title="$t('account.Setting.Phone.Title')" :content="$t('account.Setting.Phone.PhoneContent')"
                  :img='phoneImg'>
        <template v-slot:verify-content>
          <div class='verify-content'>
            <q-img class='verify-img' :src='phoneNumber !== "" ? passImg : notPassImg'></q-img>
            <span>{{ phoneNumber !== '' ? $t('account.Setting.Verify') : $t('account.Setting.NotVerify') }}</span>
          </div>
        </template>

        <template v-slot:button>
          <div>
            <q-btn class='common-button card-button' v-if='phoneNumber !== ""'
                   :label="$t('account.Setting.Phone.UpdateButton')" @click='showUpdatePhone = true' />
            <q-btn class='common-button card-button' v-if='phoneNumber === ""'
                   :label="$t('account.Setting.Phone.EnableButton')" @click='showEnablePhone = true' />
          </div>
        </template>
      </SettingBox>

      <SettingBox :title="$t('account.Setting.Google.Title')" :content="$t('account.Setting.Google.GoogleContent')"
                  :img='googleImg'>
        <template v-slot:verify-content>
          <div class='verify-content'>
            <q-img class='verify-img' :src='googleVerify ? passImg : notPassImg'></q-img>
            <span>{{ googleVerify ? $t('account.Setting.Verify') : $t('account.Setting.NotVerify') }}</span>
          </div>
        </template>

        <template v-slot:button>
          <div>
            <q-btn class='common-button card-button' :disable='googleVerify'
                   :label="$t('account.Setting.Google.Button')" @click='showEnableGoogle = true' />
          </div>
        </template>
      </SettingBox>
    </div>

    <div class='setting-column'>
      <SettingBox :title="$t('account.Setting.KYC.Title')" :content="$t('account.Setting.KYC.KYCContent')"
                  :img='kycImg'>
        <template v-slot:verify-content>
          <div class='verify-content'>
            <q-img class='verify-img' :src='kycVerify ? passImg : notPassImg'></q-img>
            <span>{{ kycVerify ? $t('account.Setting.Verify') : $t('account.Setting.NotVerify') }}</span>
          </div>
        </template>

        <template v-slot:button>
          <div>
            <q-btn class='common-button card-button' disable
                   :label="$t('account.Setting.KYC.Button')"></q-btn>
          </div>
        </template>
      </SettingBox>

      <SettingBox :title="$t('account.Setting.LoginVerify.Title')" :content="$t('account.Setting.LoginVerify.Content')"
                  :img='googleImg'>
        <template v-slot:choose>
          <q-option-group
            v-model='userGALogin'
            :options='loginOptions'
            color='teal'
            inline
            :disable='!googleVerify && emailAddress === ""'
          >
          </q-option-group>
        </template>

        <template v-slot:button>
          <q-btn class='common-button card-button' :disable='emailAddress === "" && !googleVerify'
                 :label="$t('account.Setting.LoginVerify.Button')" @click='setLoginVerify' />
        </template>
      </SettingBox>
    </div>
  </div>
  <EnableEmailDialog v-model:show-enable-email='showEnableEmail' />
  <UpdateEmailDialog v-model:show-update-email='showUpdateEmail' :email-address='emailAddress' />
  <EnablePhoneDialog v-model:show-enable-phone='showEnablePhone' />
  <UpdatePhoneDialog v-model:show-update-phone='showUpdatePhone' :phone='phoneNumber' />
  <EnableGoogleDialog v-model:show-google='showEnableGoogle' />
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, ref } from 'vue'
import changePasswordImg from 'src/assets/icon-password.svg'
import emailImg from 'src/assets/icon-email.svg'
import passImg from 'src/assets/icon-pass.svg'
import notPassImg from 'src/assets/icon-notpass.svg'
import phoneImg from 'src/assets/icon-mobile.svg'
import googleImg from 'src/assets/icon-authentication.svg'
import kycImg from 'src/assets/icon-id.svg'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { SetGALoginVerifyRequest } from 'src/store/users/types'
import { RequestInput } from 'src/store/types'
import { ActionTypes } from 'src/store/users/action-types'
import { MutationTypes } from 'src/store/users/mutation-types'
import { success } from 'src/notify/notify'

const SettingBox = defineAsyncComponent(() => import('src/components/box/SettingBox.vue'))
const EnableEmailDialog = defineAsyncComponent(() => import('src/components/dialog/setting/EnableEmail.vue'))
const UpdateEmailDialog = defineAsyncComponent(() => import('src/components/dialog/setting/UpdateEmail.vue'))
const EnablePhoneDialog = defineAsyncComponent(() => import('src/components/dialog/setting/EnablePhone.vue'))
const UpdatePhoneDialog = defineAsyncComponent(() => import('src/components/dialog/setting/UpdatePhone.vue'))
const EnableGoogleDialog = defineAsyncComponent(() => import('src/components/dialog/setting/EnableGoogle.vue'))

const store = useStore()

const emailAddress = computed(() => store.getters.getUserEmailAddress)
const phoneNumber = computed(() => store.getters.getUserPhoneNumber)
const googleVerify = computed(() => store.getters.getUserGoogleAuthenticator)
const kycVerify = computed(() => store.state.user.info.UserAppInfo.UserApplicationInfo.KycVerify)
const userGALogin = computed({
  get: () => store.getters.getUserGoogleLoginVerify,
  set: (val) => {
    store.commit(MutationTypes.SetGoogleLoginVerify, val)
  }
})

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loginOptions = ref([
  {
    label: t('account.Setting.LoginVerify.GALogin'),
    value: true
  },
  {
    label: t('account.Setting.LoginVerify.EmailLogin'),
    value: false
  }
])

const showEnableEmail = ref(false)
const showEnablePhone = ref(false)
const showUpdateEmail = ref(false)
const showUpdatePhone = ref(false)
const showEnableGoogle = ref(false)

const setLoginVerify = () => {
  if (emailAddress.value !== '' && !googleVerify.value && !userGALogin.value) {
    success(t('notify.SetLoginVerify.Success'))
    return
  }
  const request: SetGALoginVerifyRequest = {
    Set: userGALogin.value
  }
  const setGALoginVerifyRequest: RequestInput<SetGALoginVerifyRequest> = {
    requestInput: request,
    messages: {
      successMessage: t('notify.SetLoginVerify.Success'),
      failMessage: t('notify.SetLoginVerify.Fail')
    },
    loadingContent: ''
  }
  store.dispatch(ActionTypes.SetGALoginVerify, setGALoginVerifyRequest)
}
</script>

<style scoped>
.setting-flex {
  display: flex;
  flex-wrap: wrap;
}

.setting-column {
  display: flex;
  justify-content: left;
  width: 100%;
}

.verify-img {
  width: 24px;
  height: 24px;
  vertical-align: top;
}

.verify-content {
  margin-top: 20px;
  font-weight: 600;
}

.card-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  width: 80%;
  max-width: 360px;
}
</style>
