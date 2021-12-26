<template>
  <div class="drawer-items text-white">
    <div class="links" v-for="(link, index) in links" :key="index">
      <router-link v-if="link.show" class="drawer-item" :to="link.goto">
        <q-img
          fit="none"
          :src="link.img"
          class="drawer-item-img"
          style="object-fit: none !important"
        >
        </q-img>
        <span class="drawer-item-span">{{ link.label }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import miningImg from 'src/assets/icon-mining.svg'
import walletImg from 'src/assets/icon-wallet.svg'
import affiliatesImg from 'src/assets/icon-affiliates.svg'
import accountImg from 'src/assets/icon-account.svg'
import { useStore } from 'src/store'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })
const invitationCode = computed(() => store.getters.getUserInvitationCode)

const links = [
  {
    label: t('drawer.Dashboard'),
    goto: { path: '/dashboard' },
    img: miningImg,
    show: true
  },
  {
    label: t('drawer.Wallet'),
    goto: { path: '/wallet' },
    img: walletImg,
    show: false
  },
  {
    label: t('drawer.Affiliates'),
    goto: { path: '/affiliates' },
    img: affiliatesImg,
    show: invitationCode.value !== ''
  },
  {
    label: t('drawer.Account'),
    goto: { path: '/account' },
    img: accountImg,
    show: true
  }
]
</script>

<style scoped>
.drawer-items {
  display: flex;
  flex-direction: column;
}

.drawer-item {
  color: #e1eeef;
  border-radius: 0 12px 12px 0;
  cursor: pointer;
  font-size: 18px;
  padding: 18px 12px 18px 30px;
  position: relative;
  text-transform: uppercase;
  transition: all ease-in-out 0.1s;
  width: 100%;
}

.drawer-item:hover {
  background: #1ec498;
  color: #092023;
  text-decoration: none !important;
}

.drawer-item:focus {
  background: #1ec498;
  color: #092023;
}

.drawer-item:active {
  background: #1ec498;
  color: #092023;
}

.drawer-item:hover q-img:hover {
  filter: invert() saturate(0) !important;
}

.drawer-item-img {
  margin: 0 8px 0 0;
  width: 24px;
  height: 24px;
  vertical-align: text-top;
}

.drawer-item::before {
  background: linear-gradient(
    to right,
    transparent 0,
    #e1eeef 30%,
    transparent 90%
  );
  display: block;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 1px;
  width: 100%;
}

.drawer-item:last-of-type::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #e1eeef 30%,
    transparent 90%
  );
  display: block;
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 100%;
}

.drawer-item-span {
  line-height: 24px;
  margin: 3px 0 0 0;
  width: 100%;
}

.links {
  display: flex;
}
</style>
