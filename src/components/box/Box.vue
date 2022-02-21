<template>
  <q-card class='common-card-container'>
    <q-card-section class='common-card-title section-part-title'>
      <div class='title'>{{ cardTitle }}</div>

      <div v-if='showLink'>
        <a
          v-if='showEmail'
          class='link title-link'
          @click='switchChangePasswordMethod(changePasswordMethodPhone)'
        >{{ $t('box.PhoneLink') }}</a>

        <a
          v-if='showPhone'
          class='link title-link'
          @click='switchChangePasswordMethod(changePasswordMethodEmail)'
        >{{ $t('box.EmailLink') }}</a>
      </div>
    </q-card-section>
    <q-card-section class='form-container'>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script setup lang='ts'>
import { toRef, defineProps, withDefaults, computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/style/mutation-types'

const store = useStore()

interface Props {
  title: string,
  showLink?: boolean,
  alwaysSelectable: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  showLink: true,
  alwaysSelectable: true
})
const cardTitle = toRef(props, 'title')
const showLink = toRef(props, 'showLink')
const alwaysSelectable = toRef(props, 'alwaysSelectable')

const userInfo = computed(() => store.getters.getUserInfo)
const phoneNumber = computed(() => userInfo.value?.User.PhoneNO)
const emailAddress = computed(() => userInfo.value?.User.EmailAddress)

const showEmail = computed({
  get: () => {
    if (!alwaysSelectable.value) {
      if (emailAddress.value === undefined || emailAddress.value === '') {
        return false
      }
    }
    return store.getters.getShowEmail
  },
  set: (val) => {
    store.commit(MutationTypes.SetShowEmail, val)
  }
})

const showPhone = computed({
  get: () => {
    if (!alwaysSelectable.value) {
      if (phoneNumber.value === undefined || phoneNumber.value === '') {
        return false
      }
    }
    return store.getters.getShowPhone
  },
  set: (val) => {
    store.commit(MutationTypes.SetShowPhone, val)
  }
})

const changePasswordMethodPhone = 'mobile'
const changePasswordMethodEmail = 'email'

function switchChangePasswordMethod (method: string) {
  switch (method) {
    case changePasswordMethodPhone:
      if ((phoneNumber.value !== undefined && phoneNumber.value !== '') || alwaysSelectable.value) {
        showPhone.value = true
        showEmail.value = false
      }
      break
    case changePasswordMethodEmail:
      if ((emailAddress.value !== undefined && emailAddress.value !== '') || alwaysSelectable.value) {
        showEmail.value = true
        showPhone.value = false
      }
      break
  }
}

onMounted(() => {
  if (emailAddress.value !== undefined && emailAddress.value !== '') {
    showEmail.value = true
    showPhone.value = false
    return
  }
  if (phoneNumber.value !== undefined && phoneNumber.value !== '') {
    showPhone.value = true
    showEmail.value = false
  }
})

</script>

<style scoped>
.title-link {
  font-size: 12px;
  font-weight: 200;
  margin-right: 10px;
  cursor: pointer;
}

.title {
  font-weight: 400;
}

.form-container.q-card__section--vert {
  padding: 16px 0 !important;
}
</style>
