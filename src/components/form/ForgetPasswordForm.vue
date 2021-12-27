<template>
  <q-form @submit='forget'>
    <Vue3QTelInput v-if='showPhone' v-model:tel='forgetInput.Phone' bg-color='blue-grey-2' outlined
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
  </q-form>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'

const forgetInput = reactive({
  phone: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const phoneNumberRule = ref([])
const usernameRule = ref([])
</script>

<style scoped>
</style>
