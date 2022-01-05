<template>
  <div class="footer-bg">
    <div class="footer-content">
      <div class="content-4">
        <div class="content-items">
          <q-img :src="logo" class="content-logo"></q-img>
          <div class="content-h1" style="font-size: 22px">
            {{ $t('footer.First.Title') }}
          </div>
          <div class="content-h4">{{ $t('footer.First.Content') }}</div>
        </div>

        <div class="content-items">
          <h4>{{ $t('footer.Forth.Title') }}</h4>
          <ChangeLang />
        </div>

        <div class="content-items">
          <h4>{{ $t('footer.Second.Title') }}</h4>
          <div class="item-links">
            <router-link class="footer-link nav-link" :to="{ path: '/' }"
              >{{ $t('footer.Second.Home') }}
            </router-link>
            <router-link class="footer-link nav-link" :to="{ path: '/' }"
              >{{ $t('footer.Second.Products') }}
            </router-link>
            <a
              class="footer-link nav-link"
              href="https://procyon-vip.medium.com/"
              target="_blank"
              >{{ $t('footer.Second.Blog') }}</a
            >
          </div>
        </div>

        <div class="content-items">
          <h4>{{ $t('footer.Third.Title') }}</h4>
          <div class="item-links">
            <router-link class="footer-link nav-link" :to="{ path: '/faq' }"
              >{{ $t('footer.Third.Faqs') }} &
              {{ $t('footer.Third.Support') }}
            </router-link>
            <router-link class="footer-link nav-link" :to="{ path: '/legal' }"
              >{{ $t('footer.Third.Legal') }}
            </router-link>
          </div>
        </div>
      </div>
      <p class="copyright">© 2021 PRCN Technology Ltd.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const ChangeLang = defineAsyncComponent(
  () => import('../button/change-lang-button/ChangeLang.vue')
)

import logo from 'src/assets/procyon-light.svg'
</script>

<style scoped>
a {
  cursor: pointer;
  text-decoration: none;
  transition: all ease-in-out 0.3s;
}

a:hover {
  color: #11afaf;
  filter: contrast(1.5);
}

h1 {
  background: linear-gradient(to left, #54e280 0, #1ec498 50%);
  background-clip: border-box;
  filter: contrast(2);
  font-size: 40px;
  font-weight: 500;
  margin: 24px auto 24px auto;
  text-transform: uppercase;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 12px 0;
  text-transform: uppercase;
}

.footer-bg {
  background-image: url('src/assets/procyon-logo-opacity0.1.svg');
  background-position: 80% -20%;
  background-repeat: no-repeat;
  background-size: 500px;
  content: '';
  display: block;
  height: 100%;
  width: 100%;
}

.footer-content {
  margin: 0 90px;
}

.content-4 {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.content-items {
  margin: 24px 5% 24px 0;
  width: 20%;
}

.content-logo {
  width: 200px;
  height: 30px;
}

.content-h1 {
  font-size: 24px;
  margin: 12px 0;
  padding: 0 0 12px 0;
}

.content-h1::after {
  background: linear-gradient(to left, #e85f1a 0, #ffe91d 50%, #1ec498 100%);
  display: block;
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 100%;
}

div.content-h1 {
  background: linear-gradient(to left, #54e280 0, #1ec498 50%);
  background-clip: border-box;
  filter: contrast(2);
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
  -webkit-background-clip: text;
  -webkit-box-decoration-break: clone;
  -webkit-text-fill-color: transparent;
}

div.content-h4 {
  font-size: 16px;
}

.item-links {
  display: flex;
  flex-direction: column;
}

.footer-link {
  cursor: pointer;
  text-decoration: none;
  transition: all ease-in-out 0.3s;
  font-size: 16px;
  padding: 6px 0;
}

.nav-link {
  color: #e1eeef;
  text-transform: uppercase;
}

.nav-link::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #54e280 50%,
    transparent 100%
  );
  display: block;
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 1px;
  width: 100%;
  transition: all ease-in-out 0.1s;
  transform: scaleX(0);
}

.copyright {
  font-size: 14px;
  line-height: 14px;
  margin: 8px 0;
}
</style>
