<template>
  <q-form @submit='login'>
    <Vue3QTelInput
      v-if='showPhone'
      v-model:tel='loginInput.PhoneNO'
      bg-color='blue-grey-2'
      outlined
      :label="$t('input.PhoneNumber')"
      class='common-input' />
    <q-input
      v-if='showEmail'
      bg-color='blue-grey-2'
      class='common-input'
      outlined
      v-model='loginInput.EmailAddress'
      :label="$t('input.Login.Username')"
      lazy-rules
      :rules='usernameRule'
    ></q-input>

    <q-input
      bg-color='blue-grey-2'
      class='common-input'
      outlined
      v-model='loginInput.Password'
      :label="$t('input.Password')"
      :type="isPwd ? 'password' : 'text'"
      lazy-rules
      :rules='passwordRule'
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class='cursor-pointer'
          @click='isPwd = !isPwd'
        />
      </template>
    </q-input>

    <q-btn
      class='common-button login-button'
      type='submit'
    >{{ $t('button.Login') }}
    </q-btn>
    <div class='bottom-style'>
      <router-link
        class='link-style'
        :to="{ path: '/forget' }"
      >{{ $t('login.Forget') }}
      </router-link
      >
      <div>
        <span>{{ $t('login.NoAccount') }}</span>
        <router-link class='link-style' :to="{ path: '/register' }">{{
            $t('login.Register')
          }}
        </router-link>
      </div>
    </div>
  </q-form>
</template>

<script setup lang='ts'>
import { ref, computed, reactive, onBeforeMount, defineAsyncComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatPhoneNumber, isValidLoginUsername, sha256Password, ThrottleDelay, isValidPassword } from 'src/utils/utils'
import { useStore } from 'src/store'
import { UserLoginRequest } from 'src/store/users/types'
import { ActionTypes } from 'src/store/users/action-types'
import { MutationTypes } from 'src/store/users/mutation-types'
import { throttle } from 'quasar'
import { load } from 'recaptcha-v3'

const Vue3QTelInput = defineAsyncComponent(() => import('vue3-q-tel-input'))

const siteKey = '6Lcg4yIeAAAAANIyLz_mbENlYRSkK1C_aQkejb_4'
const googleRecaptchaResponse = ref('')

const initGoogleRecaptcha = () => {
  void load(siteKey).then((recaptcha) => {
    void recaptcha.execute('login').then((token) => {
      googleRecaptchaResponse.value = token
    })
  })
}

const loadGoogleRecaptcha = computed({
  get: () => store.getters.getUserLoadGoogleRecaptcha,
  set: (val: boolean) => {
    store.commit(MutationTypes.SetLoadGoogleRecaptcha, val)
  }
})

onBeforeMount(() => {
  loadGoogleRecaptcha.value = true
  initGoogleRecaptcha()
})

const store = useStore()

const showEmail = computed(() => store.getters.getShowEmail)
const showPhone = computed(() => store.getters.getShowPhone)

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const isPwd = ref(true)

const loginInput = reactive({
  EmailAddress: '',
  PhoneNO: '',
  Password: ''
})

const usernameRule = ref([
  (val: string) => isValidLoginUsername(val) || t('input.Login.UsernameWarning')
])

const passwordRule = ref([
  (val: string) => isValidPassword(val) || t('input.PasswordWarning')
])

const login = throttle((): void => {
  let accountType = 'email'
  let account = loginInput.EmailAddress

  if (showPhone.value) {
    account = formatPhoneNumber(loginInput.PhoneNO)
    accountType = 'mobile'
  }

  if (account.length === 0) {
    return
  }
  if (loginInput.Password.length === 0) {
    return
  }

  const request: UserLoginRequest = {
    Account: account,
    AccountType: accountType,
    PasswordHash: sha256Password(loginInput.Password),
    ManMachineSpec: googleRecaptchaResponse.value
  }
  store.dispatch(ActionTypes.UserLogin, request)
}, ThrottleDelay)

watch(loadGoogleRecaptcha, (n, o) => {
  if (n && !o) {
    initGoogleRecaptcha()
  }
})
</script>

<style scoped>
@import "~vue3-q-tel-input/dist/vue3-q-tel-input.esm.css";

.login-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 1px solid #ff964a;
  margin: 0 0 10px 0;
  width: 100%;
}

.bottom-style {
  display: flex;
  font-size: 14px;
  justify-content: space-between;
}

.link-style {
  color: #1ec498;
  border-bottom: none;
  text-decoration: none;
}
</style>
