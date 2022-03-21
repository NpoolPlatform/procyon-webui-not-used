<template>
  <div>
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
              <q-btn class='common-button card-button'
                    :label="$t('account.Setting.Email.UpdateButton')" @click='onUpdateEmailClick' />
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
              <q-btn class='common-button card-button'
                    :label="$t('account.Setting.Phone.UpdateButton')" @click='onUpdateMobileClick' />
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
            <div style='position: relative; width: 100%'>
              <div style='position:absolute; left: 50%; transform: translate(-50%, 0); max-width: 360px; width: 80%'>
                <q-tooltip
                  class='text-body2'
                  anchor='top middle'
                  self='bottom middle'
                  :offset='[10, 10]'
                  v-if='googleVerify'
                >{{ $t('account.Setting.Google.HasDone') }}
                </q-tooltip>
                <q-btn class='common-button card-button' :disable='googleVerify'
                      :label="$t('account.Setting.Google.Button')" @click='onUpdateGoogleClick' />
              </div>
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

        <SettingBox :title="$t('account.Setting.LoginVerify.Title')"
                    :content="$t('account.Setting.LoginVerify.Content')"
                    :img='googleImg'>
          <template v-slot:choose>
            <q-option-group
              v-model='verifyMethod'
              :options='loginOptions'
              @update:model-value='(value) => onSelectVerifyMethod(value)'
              color='teal'
              inline
              :disable='!verifySelectEnable'
            >
            </q-option-group>
          </template>

          <template v-slot:button>
            <q-btn class='common-button card-button' :disable='!verifySelectEnable'
                  :label="$t('account.Setting.LoginVerify.Button')" @click='setLoginVerify' />
          </template>
        </SettingBox>
      </div>
    </div>
    <div class='hr' />
    <div style='margin-bottom: 20px'>
      <div class='section-part-title'>{{$t('account.History.Title')}}</div>
      <LoginHistoryTable />
    </div>
  </div>
  <EnableGoogleDialog v-model:show-google='showEnableGoogle' />
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, ref, onMounted, onUnmounted } from 'vue'
import changePasswordImg from 'assets/icon-password.svg'
import emailImg from 'assets/icon-email.svg'
import passImg from 'assets/icon-pass.svg'
import notPassImg from 'assets/icon-notpass.svg'
import phoneImg from 'assets/icon-mobile.svg'
import googleImg from 'assets/icon-authentication.svg'
import kycImg from 'assets/icon-id.svg'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { AppUserControl, SetGALoginVerifyRequest } from 'src/store/users/types'
import { ActionTypes } from 'src/store/users/action-types'
import { MutationTypes } from 'src/store/users/mutation-types'
import { MutationTypes as verifyMutationTypes } from 'src/store/verify/mutation-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useRouter } from 'src/router'

const SettingBox = defineAsyncComponent(() => import('components/box/SettingBox.vue'))
const EnableGoogleDialog = defineAsyncComponent(() => import('components/dialog/setting/EnableGoogle.vue'))
const LoginHistoryTable = defineAsyncComponent(() => import('src/components/table/LoginHistory.vue'))

const store = useStore()

const userInfo = computed(() => store.getters.getUserInfo)

const emailAddress = computed(() => userInfo.value.User.EmailAddress)
const phoneNumber = computed(() => userInfo.value.User.PhoneNO)
const googleVerify = computed(() => userInfo.value.Ctrl && userInfo.value.Ctrl?.GoogleAuthenticationVerified)
const kycVerify = computed(() => false)

const verifyMethodEmail = 'email-verification'
const verifyMethodGoogle = 'google-verification'
const verifyMethodUnknown = 'unknown-verification'

const userGALogin = computed({
  get: () => userInfo.value.Ctrl?.SigninVerifyByGoogleAuthentication,
  set: (val) => {
    store.commit(MutationTypes.SetGoogleLoginVerify, val)
  }
})

const verifyMethod = computed({
  get: () => store.state.verify.verifyMethod,
  set: (val) => {
    store.commit(verifyMutationTypes.SetVerifyMethod, val)
  }
})

let lastVerifyMethod = verifyMethod.value

type MyFunction = () => void
const unsubscribe = ref<MyFunction>()

const setVerifyMethod = () => {
  if (googleVerify.value && userGALogin.value) {
    verifyMethod.value = verifyMethodGoogle
  } else if (emailAddress.value && emailAddress.value !== '') {
    verifyMethod.value = verifyMethodEmail
  } else {
    verifyMethod.value = verifyMethodUnknown
  }
  lastVerifyMethod = verifyMethod.value
}

onMounted(() => {
  store.dispatch(ActionTypes.GetAppUserInfo, {
    ID: userInfo.value.User.ID as string,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_APP_LANG_INFOS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  setVerifyMethod()

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === MutationTypes.SetEmailAddress) {
      setVerifyMethod()
    }

    if (mutation.type === MutationTypes.SetUserInfo) {
      setVerifyMethod()
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

function onSelectVerifyMethod (value: string) {
  switch (value) {
    case verifyMethodEmail:
      if (emailAddress.value === undefined || emailAddress.value === '') {
        verifyMethod.value = lastVerifyMethod
        return
      }
      break
    case verifyMethodGoogle:
      if (!googleVerify.value) {
        verifyMethod.value = lastVerifyMethod
        return
      }
      break
  }
  lastVerifyMethod = verifyMethod.value
}

const verifySelectEnable = computed(
  () => {
    if (googleVerify.value) {
      if (!userGALogin.value) {
        return true
      }
      if (emailAddress.value !== undefined && emailAddress.value !== '') {
        return true
      }
    }
    return false
  }
)

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loginOptions = ref([
  {
    label: t('account.Setting.LoginVerify.GALogin'),
    value: 'google-verification'
  },
  {
    label: t('account.Setting.LoginVerify.EmailLogin'),
    value: 'email-verification'
  }
])

const showEnableGoogle = ref(false)

const router = useRouter()

const onUpdateEmailClick = () => {
  void router.push({ path: '/update/email' })
}

const onUpdateMobileClick = () => {
  void router.push({ path: '/update/mobile' })
}

const onUpdateGoogleClick = () => {
  void router.push({ path: '/update/google' })
}

const setLoginVerify = () => {
  const request: SetGALoginVerifyRequest = {
    Info: {
      ID: userInfo.value.Ctrl?.ID,
      AppID: userInfo.value.Ctrl?.AppID,
      UserID: userInfo.value.Ctrl?.UserID,
      SigninVerifyByGoogleAuthentication: verifyMethod.value === verifyMethodGoogle,
      GoogleAuthenticationVerified: userInfo.value.Ctrl?.GoogleAuthenticationVerified
    } as AppUserControl
  }
  store.dispatch(ActionTypes.SetGALoginVerify, request)
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
  width: 100%;
  max-width: 360px;
}

.disabled {
  filter: saturate(0);
}
</style>
