<template>
  <div class='drawer-items text-white'>
    <div class='links'>
      <router-link class='drawer-item' :to="{ path: '/dashboard' }">
        <q-img
          fit='none'
          :src='dashboardImg'
          class='drawer-item-img'
          style='object-fit: none !important'
        >
        </q-img>
        <span class='drawer-item-span'>{{ $t('drawer.Dashboard') }}</span>
      </router-link>

      <router-link v-show='false' class='drawer-item' :to="{ path: '/wallet' }">
        <q-img
          fit='none'
          :src='walletImg'
          class='drawer-item-img'
          style='object-fit: none !important'
        >
        </q-img>
        <span class='drawer-item-span'>{{ $t('drawer.Wallet') }}</span>
      </router-link>

      <router-link v-if='showAffiliate' class='drawer-item' :to="{ path: '/affiliate' }">
        <q-img
          fit='none'
          :src='affiliatesImg'
          class='drawer-item-img'
          style='object-fit: none !important'
        >
        </q-img>
        <span class='drawer-item-span'>{{ $t('drawer.Affiliates') }}</span>
      </router-link>

      <router-link class='drawer-item' :to="{ path: '/security' }">
        <q-img
          fit='none'
          :src='securityImg'
          class='drawer-item-img'
          style='object-fit: none !important'
        >
        </q-img>
        <span class='drawer-item-span'>{{ $t('drawer.Security') }}</span>
      </router-link>

      <router-link class='drawer-item' :to="{ path: '/account' }">
        <q-img
          fit='none'
          :src='accountImg'
          class='drawer-item-img'
          style='object-fit: none !important'
        >
        </q-img>
        <span class='drawer-item-span'>{{ $t('drawer.Account') }}</span>
      </router-link>

      <router-link class='drawer-item' :to="{ path: '/kyc' }">
        <q-img
          fit='none'
          :src='kycImg'
          class='drawer-item-img'
          style='object-fit: none !important'
        >
        </q-img>
        <span class='drawer-item-span'>{{ $t('drawer.KYC') }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang='ts'>
import dashboardImg from 'src/assets/icon-mining.svg'
import walletImg from 'src/assets/icon-wallet.svg'
import affiliatesImg from 'src/assets/icon-affiliates.svg'
import accountImg from 'src/assets/icon-account.svg'
import securityImg from 'src/assets/icon-security.svg'
import kycImg from 'src/assets/icon-kyc.svg'

import { defineProps, withDefaults, toRef } from 'vue'

interface Props {
  hasInvitationCode: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasInvitationCode: false
})

const showAffiliate = toRef(props, 'hasInvitationCode')
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
  flex-direction: column;
}
</style>
