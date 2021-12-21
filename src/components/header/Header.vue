<template>
  <div class="header-left">
    <router-link :to="{ path: '/' }">
      <q-img :src="logo" class="header-title"></q-img>
    </router-link>
  </div>
  <div class="header-right">
    <router-link class="nav-link" :to="{ path: '/' }">
      {{ $t('header.Home') }}
    </router-link>
    <a class="nav-link" href="https://procyon-vip.medium.com/" target="_blank">
      {{ $t('header.Blog') }}
    </a>
    <router-link class="nav-link" :to="{ path: '/faq' }">
      {{ $t('header.Support') }}
    </router-link>
    <a class="nav-link" href="mailto:support@procyon.vip">
      {{ $t('header.Contact') }}
    </a>
    <div class="button-group" style="margin-right: 10px">
      <q-btn-toggle
        v-model="locale"
        push
        glossy
        toggle-color="orange-9"
        @click="changeLang"
        :options="[
          { label: 'En', value: 'en-US' },
          { label: '日本語', value: 'ja-JP' },
        ]"
      />
    </div>
    <q-btn
      v-if="!logined"
      class="btn-register"
      style="width: 140px; margin-right: 10px; text-transform: unset"
      flat
      @click="$router.push('/emailregister')"
    >
      {{ $t('header.Register') }}
    </q-btn>
    <q-btn v-if="!logined" class="alt" flat @click="$router.push('/login')">
      {{ $t('header.Login') }}
    </q-btn>
    <AvatarDropdown></AvatarDropdown>
  </div>
</template>

<script setup lang="ts">
import AvatarDropdown from './dropdown/AvatarDropdown.vue'
import logo from '../../assets/procyon-light.svg'
import { useStore } from 'src/store/index'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { MutationTypes } from 'src/store/style/mutation-types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { locale } = useI18n({ useScope: 'global' })

const logined = computed(() => store.getters.getUserLogined)
const changeLang = () => {
  if (locale.value === 'en-US') {
    store.commit(MutationTypes.SetFontStyle, 'font-family: Barlow')
  } else {
    store.commit(MutationTypes.SetFontStyle, 'font-family: "Noto Sans JP"')
  }
}
</script>

<style scoped>
/* a:not([class]) {
  color: #1ec498;
  filter: contrast(1.5);
  transition: all ease-in-out 0.3s;
}

a:not([class]):hover::after {
  color: #1ec498;
  filter: contrast(1.5);
  text-decoration: underline 1px solid #11afaf;
}
 */
a:hover {
  color: #11afaf;
  filter: contrast(1.5);
}

.header-title {
  width: 150px;
  height: 23px;
}

.header-right {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px;
}

.nav-link {
  color: #e1eeef;
  position: relative;
  text-transform: uppercase;
  padding: 12px;
  cursor: pointer;
  text-decoration: none;
}

.nav-link::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #54e280 50%,
    transparent 100%
  );
  display: block;
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 1px;
  width: 100%;
  transition: all ease-in-out 0.1s;
  transform: scaleX(0);
}

.alt {
  background: none;
  border: 1px solid #ff964a;
  color: #ff964a;
  text-shadow: 1px 1px 1px #27424c;
  border-radius: 8px;
  font-size: 14px;
  height: auto;
  margin: 24px 0 0 12px;
  padding: 8px 20px;
  border-radius: 18px;
  cursor: pointer;
  /* font-family: "Barlow", sans-serif; */
  font-weight: 600;
  transition: all ease-in-out 0.1s;
}

.alt:hover {
  border-radius: 2px;
}
</style>
