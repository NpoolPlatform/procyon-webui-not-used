<template>
  <q-card class='form-container'>
    <q-card-section>
      <h3 class='common-card-title'>{{ $t('contact.Left.Title') }}</h3>
    </q-card-section>
    <q-card-section>
      <q-form @submit='sendMessage'>
        <q-input class='common-input input-style' bg-color='blue-grey-2' outlined v-model='email'
                 :label='$t("input.EmailAddress")' lazy-rules :rules='emailRules'></q-input>
        <q-input class='common-input input-style' bg-color='blue-grey-2' outlined v-model='name'
                 :label='$t("input.Name")' lazy-rules :rules='nameRules'></q-input>
        <q-input class='common-input input-style' bg-color='blue-grey-2' outlined v-model='subject'
                 :label='$t("input.Subject")' lazy-rules :rules='subjectRules'></q-input>
        <q-input class='common-input input-style input-textarea-style' bg-color='blue-grey-2' outlined
                 v-model='messages' :label='$t("input.Message")' type='textarea' lazy-rules
                 :rules='messageRules'></q-input>
        <q-btn class='common-button send-message' :label="$t('button.SendMessage')" type='submit'></q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes } from 'src/store/verify/action-types'
import { SendUserSiteContactEmailRequest } from 'src/store/verify/types'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n()

const store = useStore()

const email = ref('')
const name = ref('')
const subject = ref('')
const messages = ref('')

const emailRules = ref([
  (val: string) => (val && val.length > 0) || t('input.EmailAddressWarning')
])
const nameRules = ref([
  (val: string) => (val && val.length > 0) || t('input.NameWarning')
])
const subjectRules = ref([
  (val: string) => (val && val.length > 0) || t('input.SubjectWarning')
])
const messageRules = ref([
  (val: string) => (val && val.length > 0) || t('input.MessageWarning')
])

const sendMessage = () => {
  const request: SendUserSiteContactEmailRequest = {
    Username: name.value,
    From: email.value,
    To: 'support@procyon.vip',
    Subject: subject.value,
    Text: messages.value
  }
  store.dispatch(ActionTypes.SendUserSiteContactEmail, request)
}
</script>

<style scoped>
.form-container {
  background: linear-gradient(to bottom right, rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%);
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 48px;
  margin: 48px auto;
  min-width: 360px;
  max-width: 480px;
  width: 35%;
}

.input-style {
  margin: 8px 0 24px 0;
  width: 100%;
}

.input-textarea-style >>> .q-field__control {
  min-height: 200px !important;
}

.send-message {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 1px solid #ff964a;
  margin: 0 0 10px 0;
  width: 100%;
}
</style>
