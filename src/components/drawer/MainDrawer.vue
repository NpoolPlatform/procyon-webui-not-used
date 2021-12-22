<template>
  <div class="drawer-items text-white">
    <router-link href class="drawer-item" :to="{ path: '/dashboard' }">
      <div class="row">
        <q-img fit="none" :src="miningImg" class="drawer-item-img"></q-img>
        <span class="drawer-item-span">{{ $t('drawer.Dashboard') }}</span>
      </div>
    </router-link>

    <!-- <router-link href class="drawer-item" :to="{ path: '/wallet' }">
          <div class="row">
            <q-img fit="none" :src="walletImg" class="drawer-item-img"></q-img>
            <span class="drawer-item-span">{{ $t("drawer.Wallet") }}</span>
          </div>
        </router-link> -->

    <router-link
      href
      class="drawer-item"
      :to="{ path: '/affiliates' }"
      v-if="hasInvitationCode"
    >
      <div class="row">
        <q-img
          fit="none"
          :src="affiliatesImg"
          class="drawer-item-img"
          style="object-fit: none !important"
        ></q-img>
        <span class="drawer-item-span">{{ $t('drawer.Invitation') }}</span>
      </div>
    </router-link>

    <router-link href class="drawer-item" :to="{ path: '/account' }">
      <div class="row">
        <q-img fit="none" :src="accountImg" class="drawer-item-img"></q-img>
        <p class="drawer-item-span">{{ $t('drawer.Account') }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import miningImg from 'src/assets/icon-mining.svg'
// import walletImg from 'src/assets/icon-wallet.svg'
import affiliatesImg from 'src/assets/icon-affiliates.svg'
import accountImg from 'src/assets/icon-account.svg'
import { useStore } from 'src/store'

import { computed } from 'vue'

const store = useStore()
const hasInvitationCode = computed(() => store.getters.getUserHasInvitationCode)
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
}
</style>
