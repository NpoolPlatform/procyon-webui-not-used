<template>
  <q-layout class='main-body' :style='fontStyle'>
    <q-header reveal class='page-header'>
      <MainHeader />
    </q-header>

    <q-drawer
      :width='200'
      v-model='showDrawer'
      style='background: transparent !important'
    >
      <MainDrawer :hasInvitationCode='hasInvitationCode' />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class='page-footer'>
      <MainFooter />
    </q-footer>
  </q-layout>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent, onBeforeMount, onMounted, onUpdated, watch } from 'vue'
import { useStore } from 'src/store'
import { useQuasar } from 'quasar'
import { MutationTypes } from 'src/store/notify/mutation-types'
import { notify } from 'src/notify/notify'
import { useRouter } from 'vue-router'
import { MutationTypes as styleMutation } from 'src/store/style/mutation-types'
import { ActionTypes } from 'src/store/users/action-types'
import { GetUserDetailRequest, GetUserInvitationCodeRequest } from 'src/store/users/types'
import { useI18n } from 'vue-i18n'
import { loginVeiryConfirm } from 'src/utils/utils'
import { MutationTypes as userMutation } from 'src/store/users/mutation-types'

const store = useStore()

const router = useRouter()
const nowPath = computed(() => router.currentRoute.value.path)

const loading = computed(() => store.getters.getLoading)
const messages = computed(() => store.getters.getNotifyMessages)
const loadingContent = computed(() => store.getters.getLoadingContent)
const logined = computed({
  get: () => store.getters.getUserLogined,
  set: (val) => {
    store.commit(userMutation.SetUserLogined, val)
  }
})

const loginVerify = computed({
  get: () => store.getters.getLoginVerify,
  set: (val) => {
    store.commit(userMutation.SetLoginVerify, val)
  }
})

const q = useQuasar()

watch(loading, (newLoding, oldLoading) => {
  if (newLoding && !oldLoading) {
    q.loading.show({
      message: loadingContent.value
    })
  } else if (!newLoding && oldLoading) {
    q.loading.hide()
  }
})

const showDrawer = computed({
  get: () => store.getters.getShowDrawer,
  set: (val: boolean) => {
    store.commit(styleMutation.SetShowDrawer, val)
  }
})

const fontStyle = computed({
  get: () => store.getters.getFontStyle,
  set: (val) => {
    store.commit(styleMutation.SetFontStyle, val)
  }
})

onBeforeMount(() => {
  const appid = 'ff2c5d50-be56-413e-aba5-9c7ad888a769'
  q.cookies.set('AppID', appid)

  if (nowPath.value === '/account' || nowPath.value === '/dashboard' || nowPath.value === '/affiliate') {
    showDrawer.value = true
  } else {
    showDrawer.value = false
  }

  const { locale } = useI18n({ useScope: 'global' })
  if (locale.value === 'en-US') {
    fontStyle.value = 'font-family: Barlow'
  } else {
    fontStyle.value = 'font-family: "Noto Sans JP"'
  }

  store.subscribe(mutation => {
    if (mutation.type === MutationTypes.PushMessage) {
      if (messages.value.length !== 0) {
        messages.value.forEach((message) => {
          notify(message)
        })
        store.commit(MutationTypes.CleanMessages)
      }
    }
  })
})

const getUserDetails = () => {
  const request: GetUserDetailRequest = {}
  store.dispatch(ActionTypes.GetUserDetail, request)
}

const getUserInvitationCode = () => {
  const request: GetUserInvitationCodeRequest = {}
  store.dispatch(ActionTypes.GetUserInvitationCode, request)
}

onMounted(() => {
  if (q.cookies.has('UserID') && q.cookies.has('AppSession')) {
    if (q.cookies.has(loginVeiryConfirm)) {
      getUserDetails()
      getUserInvitationCode()
    } else {
      logined.value = false
      loginVerify.value = false
      void router.push('/login')
    }
  }
})

onUpdated(() => {
  if (nowPath.value === '/account' || nowPath.value === '/dashboard' || nowPath.value === '/affiliate') {
    showDrawer.value = true
  } else {
    showDrawer.value = false
  }
})

const MainHeader = defineAsyncComponent(
  () => import('src/components/header/MainHeader.vue')
)
const MainDrawer = defineAsyncComponent(
  () => import('src/components/drawer/MainDrawer.vue')
)
const MainFooter = defineAsyncComponent(
  () => import('src/components/footer/MainFooter.vue')
)

const hasInvitationCode = computed(() => store.getters.getUserInvitationCode !== '')
</script>

<style scoped>
.main-body {
  background-image: url('../assets/procyon-logo-opacity0.025.svg');
  background-position: 90% -360px;
  background-repeat: no-repeat;
  background-size: 800px;
  display: block;
  top: 0;
  right: 0;
  height: auto;
  width: 100%;
  font-family: Barlow sans-serif;
}

.page-header {
  background: none;
  height: 100px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
}

.q-drawer-container >>> .q-drawer {
  background: none;
}

.page-footer {
  background: linear-gradient(to bottom right, #27424c 0, #051319 100%);
  box-shadow: 0px 0px 60px 15px #051319;
  padding: 16px 0;
  width: 100%;
  z-index: 1;
  height: auto;
  display: block;
  position: absolute;
  bottom: 0;
}

.page-footer::before {
  background: linear-gradient(to left, #e85f1a 0, #ffe91d 50%, #1ec498 100%);
  display: block;
  content: '';
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  height: 1px;
  width: 100%;
}
</style>
