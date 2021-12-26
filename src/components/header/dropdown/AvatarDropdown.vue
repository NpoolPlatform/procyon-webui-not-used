<template>
  <q-btn-dropdown
    flat
    rounded
    dense
    no-icon-animation
    dropdown-icon='img:icons/icon-user.svg'
    :size='avatarSize'
    v-if='logined'
    content-style='{width: 150px;background: linear-gradient(to bottom right,rgba(225, 238, 239, 0.2) 0,rgba(161, 208, 208, 0.2) 100%);box-shadow: 16px 16px 20px 0 #23292b;border-radius: 12px;color: #e1eeef;overflow: hidden;}'
  >
    <q-list>
      <div v-for='(l, index) in list' :key='index'>
        <q-item v-if='l.show' clickable v-close-popup @click='l.method'>
          <q-item-section>
            <q-item-label>{{ l.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang='ts'>
import { defineProps, computed, toRef, withDefaults } from 'vue'
import { useStore } from 'src/store'
import { ActionTypes } from 'src/store/users/action-types'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { RequestInput } from 'src/store/types'
import { UserLogoutRequest } from 'src/store/users/types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

interface Props {
  avatarSize?: string
}

const props = withDefaults(defineProps<Props>(), {
  avatarSize: '28px'
})

const avatarSize = toRef(props, 'avatarSize')

const logined = computed(() => store.getters.getUserLogined)
const invitationCode = computed(() => store.getters.getUserInvitationCode)

const logout = () => {
  const request: UserLogoutRequest = {}
  const userLogoutRequest: RequestInput<UserLogoutRequest> = {
    requestInput: request,
    messages: {
      successMessage: t('notify.Logout.Success'),
      failMessage: t('notify.Logout.Fail')
    },
    loadingContent: t('notify.Logout.Load')
  }
  store.dispatch(ActionTypes.UserLogout, userLogoutRequest)
}

const list = [
  {
    show: true,
    method: () => {
      void router.push('/dashboard')
    },
    label: t('menuList.Dashboard')
  },
  {
    show: false,
    method: () => {
      void router.push('/wallet')
    },
    label: t('menuList.Wallet')
  },
  {
    show: invitationCode.value !== '',
    method: () => {
      void router.push('/affiliates')
    },
    label: t('menuList.Affiliates')
  },
  {
    show: true,
    method: () => {
      void router.push('/account')
    },
    label: t('menuList.Account')
  },
  {
    show: true,
    method: logout,
    label: t('menuList.Logout')
  }
]
</script>

<style scoped>
</style>
