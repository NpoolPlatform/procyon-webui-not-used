<template>
  <q-form @submit='login'>
    <Vue3QTelInput v-if='showPhone' v-model:tel='loginInput.Phone' bg-color='blue-grey-2' outlined
                   lazy-rules
                   :rules='phoneNumberRule'></Vue3QTelInput>
    <q-input
      v-if='showEmail'
      bg-color='blue-grey-2'
      class='common-input'
      outlined
      v-model='loginInput.Username'
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
        :to="{ path: '/forgetpassword' }"
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
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { isValidEmail, isValidLoginUsername, isValidUsername, ThrottleDelay } from 'src/utils/utils'
import Vue3QTelInput from 'vue3-q-tel-input'
import { useStore } from 'src/store'
import { UserLoginRequest } from 'src/store/users/types'
import { ActionTypes } from 'src/store/users/action-types'
import { RequestInput } from 'src/store/types'
import { throttle } from 'quasar'

const store = useStore()

const showEmail = computed(() => store.getters.getShowEmail)
const showPhone = computed(() => store.getters.getShowPhone)

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const isPwd = ref(true)

const loginInput: UserLoginRequest = reactive({
  Username: '',
  Phone: '',
  Password: '',
  GoogleRecaptchaResponse: ''
})

const usernameRule = ref([
  (val: string) => isValidLoginUsername(val) || t('input.Login.UsernameWarning')
])

const passwordRule = ref([
  (val: string) => (val && val.length > 0) || t('input.PasswordWarning')
])

const phoneNumberRule = ref([
  (val: string) => (!isValidUsername(val) || !isValidEmail(val)) || t('input.PhoneNumberWarning')
])

const login = throttle((): void => {
  const request: RequestInput<UserLoginRequest> = {
    requestInput: loginInput,
    messages: {
      successMessage: t('notify.Login.Success'),
      failMessage: t('notify.Login.Fail')
    },
    loadingContent: t('notify.Login.Load')
  }
  store.dispatch(ActionTypes.UserLogin, request)
}, ThrottleDelay)

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
