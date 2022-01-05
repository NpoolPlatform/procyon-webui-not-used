<template>
  <q-btn-dropdown
    flat
    rounded
    dense
    no-icon-animation
    dropdown-icon='img:icons/icon-user.svg'
    :size='avatarSize'
    v-if='logined'
    content-style='{width: 150px;background: linear-gradient(to bottom right,rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%);box-shadow: 16px 16px 20px 0 #23292b;border-radius: 12px;color: #e1eeef;overflow: hidden;}'
  >
    <q-list>
      <div class='avatar-dropdown'>
        <q-item clickable v-close-popup @click='$router.push("/dashboard")'>
          <q-item-section>
            <q-item-label>{{ $t('menuList.Dashboard') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if='false' clickable v-close-popup @click='$router.push("/wallet")'>
          <q-item-section>
            <q-item-label>{{ $t('menuList.Wallet') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if='showAffiliate' clickable v-close-popup @click='$router.push("/affiliate")'>
          <q-item-section>
            <q-item-label>{{ $t('menuList.Affiliates') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click='$router.push("/account")'>
          <q-item-section>
            <q-item-label>{{ $t('menuList.Account') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click='logout'>
          <q-item-section>
            <q-item-label>{{ $t('menuList.Logout') }}</q-item-label>
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
import { MutationTypes } from 'src/store/users/mutation-types'
import { NilUserInfo, UserLogoutRequest } from 'src/store/users/types'

const store = useStore()

interface Props {
  avatarSize?: string
  hasInvitationCode: boolean
}

const props = withDefaults(defineProps<Props>(), {
  avatarSize: '28px',
  hasInvitationCode: false
})

const avatarSize = toRef(props, 'avatarSize')
const showAffiliate = toRef(props, 'hasInvitationCode')

const logined = computed({
  get: () => store.getters.getUserLogined,
  set: (val) => {
    store.commit(MutationTypes.SetUserLogined, val)
  }
})

const loginVerify = computed({
  get: () => store.getters.getLoginVerify,
  set: (val) => {
    store.commit(MutationTypes.SetLoginVerify, val)
  }
})

const userInfo = computed({
  get: () => store.getters.getUserInfo,
  set: (val) => {
    store.commit(MutationTypes.SetUserInfo, val)
  }
})

const logout = () => {
  const request: UserLogoutRequest = {}

  userInfo.value = NilUserInfo
  logined.value = false
  loginVerify.value = false

  store.dispatch(ActionTypes.UserLogout, request)
}
</script>

<style scoped>
.avatar-dropdown {
  color: white;
  width: 160px;
}
</style>
