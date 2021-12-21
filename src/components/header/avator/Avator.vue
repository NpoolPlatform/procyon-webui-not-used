<template>
  <div class="avator-box" @click.stop>
    <q-avatar class="avator-position" :size="avatorSize">
      <img
        :src="userIcon"
        @click="showList = !showList"
        style="cursor: pointer"
        v-if="logined"
      />
    </q-avatar>

    <div class="list-box" v-if="showList">
      <q-list>
        <div v-for="(l, index) in list" :key="index">
          <q-item v-if="l.show" clickable v-close-popup @click="l.method">
            <q-item-section>
              <q-item-label>{{ l.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  defineProps,
  computed,
  toRef,
  withDefaults,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { useStore } from 'src/store/index'
import userIcon from '../../../assets/icon-user.svg'
import { ActionTypes } from 'src/store/users/action-types'
import { waiting } from '../../../notify/notify'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

interface Props {
  avatorSize?: string
}
const props = withDefaults(defineProps<Props>(), {
  avatorSize: '42px'
})

const avatorSize = toRef(props, 'avatorSize')

const logined = computed(() => store.getters.getUserLogined)
const hasInvitationCode = computed(() => store.getters.getUserHasInvitationCode)

const showList = ref(false)

const logout = () => {
  const wait = waiting(t('notify.Logout.Waiting'))
  store.dispatch(ActionTypes.UserLogout)
  const err = store.getters.getUserError
  if (err !== '') {
    wait({
      type: 'negative',
      message: t('notify.Logout.Fail'),
      caption: err
    })
    return
  }
  wait({
    type: 'positive',
    message: t('notify.Logout.Success')
  })
}

const list = [
  {
    show: true,
    method: () => {
      void router.push('/dashboard')
      showList.value = !showList.value
    },
    label: t('menuList.Dashboard')
  },
  {
    show: false,
    method: () => {
      void router.push('/wallet')
      showList.value = !showList.value
    },
    label: t('menuList.Wallet')
  },
  {
    show: hasInvitationCode.value,
    method: () => {
      void router.push('/affiliates')
      showList.value = !showList.value
    },
    label: t('menuList.Affiliates')
  },
  {
    show: true,
    method: () => {
      void router.push('/account')
      showList.value = !showList.value
    },
    label: t('menuList.Account')
  },
  { show: true, method: logout, label: t('menuList.Logout') }
]

// method
const bodyCloseSelected = () => {
  showList.value = false
}

// mounted
onMounted(() => {
  document.addEventListener('click', bodyCloseSelected)
})

// beforeUnmounted
onBeforeUnmount(() => {
  document.removeEventListener('click', bodyCloseSelected)
})
</script>

<style scoped>
.avator-box {
  position: relative;
}

.avator-position {
  position: relative;
}

.list-box {
  position: absolute;
  top: 45px;
  width: 150px;
  /* left: 0px; */
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  overflow: hidden;
}
</style>
