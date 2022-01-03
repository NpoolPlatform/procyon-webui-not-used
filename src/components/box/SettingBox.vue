<template>
  <div class='setting-box column'>
    <div class='col-10'>
      <div class='setting-header'>
        <q-img :src='img' class='setting-img'></q-img>
        <div class='setting-subtitle'>{{ title }}</div>
      </div>
      <div class='setting-content'>{{ content }}</div>
      <slot name='verify-content'></slot>
      <slot name='choose'></slot>
    </div>
    <div class='button-position col'>
      <slot name='button'></slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults, toRef } from 'vue'

interface Props {
  title: string
  img: string
  content: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  img: '',
  content: ''
})

const title = toRef(props, 'title')
const img = toRef(props, 'img')
const content = toRef(props, 'content')
</script>

<style scoped>
.setting-box {
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  /* background-color: black; */
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 24px;
  margin: 24px;
  position: relative;
}

.setting-box {
  width: 90%;
  height: auto;
  min-height: 265px;
}

.setting-header {
  display: flex;
  margin-bottom: 10px;
}

.setting-header::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #e1eeef 10%,
    transparent 30%
  );
  display: block;
  content: "";
  position: absolute;
  top: 65px;
  height: 1px;
  width: 1000px;
}

.setting-img {
  width: 36px;
  height: 36px;
}

.setting-subtitle {
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 34px;
  margin-left: 10px;
}

.button-position {
  width: 100%;
  text-align: center;
  bottom: 24px;
  left: 0;
}

</style>
