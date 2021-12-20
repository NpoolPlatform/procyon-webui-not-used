<template>
  <div>
    <q-img
      v-if="logined"
      class="avator"
      :src="userImg"
      @click="showList = !showList"
      style="cursor: pointer"
    ></q-img>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, toRef, withDefaults } from 'vue'
import { useStore } from 'src/store/index'

const $store = useStore()

interface Props {
  userImg: string
}

const props = withDefaults(defineProps<Props>(), {
  userImg: ''
})

const userImg = toRef(props, 'userImg')

const logined = computed(() => $store.getters.getUserLogined)

const showList = ref(false)
</script>

<style scoped>
</style>
