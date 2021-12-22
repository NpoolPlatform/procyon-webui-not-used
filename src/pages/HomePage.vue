<template>
  <div id="main">
    <div class="content">
      <div class="content-title">
        <div class="title-1">{{ $t('homepage.Content1.Title') }}</div>
        <div class="title-2">{{ $t('homepage.Content1.Subtitle') }}</div>
        <q-btn
          v-if="!logined"
          @click="$router.push('/emailregister')"
          class="common-button register-btn"
          >{{ $t('button.Register') }}</q-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'src/store'

const store = useStore()
const logined = computed(() => store.getters.getUserLogined)
</script>

<style scoped>
.content-title {
  position: relative;
  padding-bottom: 30px;
}

.content-title::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #e85f1a 30%,
    #ffe91d 50%,
    #1ec498 80%,
    transparent 100%
  );
  display: block;
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
}

.content-title h1 {
  font-size: 40px;
}

.content-title h2 {
  color: #e4f4f0;
  font-size: 28px;
  font-weight: 300;
  margin: 12px auto 12px auto;
}

.title-1 {
  background: linear-gradient(to left, #54e280 0, #1ec498 50%);
  background-clip: border-box;
  filter: contrast(2);
  font-size: 40px;
  font-weight: 500;
  margin: 24px auto 24px auto;
  text-transform: uppercase;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
}

.title-2 {
  color: #e4f4f0;
  font-size: 28px;
  font-weight: 300;
  margin: 12px auto 12px auto;
}

.register-btn {
  width: 175px !important;
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  font-size: 18px !important;
}
</style>
