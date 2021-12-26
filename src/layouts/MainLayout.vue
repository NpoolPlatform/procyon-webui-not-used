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
      <MainDrawer />
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
import { computed, defineAsyncComponent, onBeforeMount, ref, watch } from 'vue'
import { useStore } from 'src/store'
import { useQuasar } from 'quasar'
import { MutationTypes } from 'src/store/notify/mutation-types'
import { notify } from 'src/notify/notify'

const store = useStore()

const loading = computed(() => store.getters.getLoading)
const messages = computed(() => store.getters.getNotifyMessages)
const loadingContent = computed(() => store.getters.getLoadingContent)

const q = useQuasar()
const $q = useQuasar()

watch(loading, (newLoding, oldLoading) => {
  if (newLoding && !oldLoading) {
    $q.loading.show({
      message: loadingContent.value
    })
  } else if (!newLoding && oldLoading) {
    $q.loading.hide()
  }
})

onBeforeMount(() => {
  const appid = 'ff2c5d50-be56-413e-aba5-9c7ad888a769'
  q.cookies.set('AppID', appid)

  store.subscribe(mutation => {
    if (mutation.type === MutationTypes.PushMessage) {
      console.log('pushing message')
      if (messages.value.length !== 0) {
        messages.value.forEach((message) => {
          notify(message)
        })
        store.commit(MutationTypes.CleanMessages)
      }
    }
  })
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

const showDrawer = ref(false)

const fontStyle = computed(() => store.getters.getFontStyle)
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
