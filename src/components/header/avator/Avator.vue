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

<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue'
import { useStore } from 'src/store/index'

const $store = useStore()

const props = defineProps({
  userImg: String
})

const userImg = ref(props.userImg)
const logined = computed(() => $store.getters.getUserLogined)

const showList = ref(false)
</script>

<style scoped>
</style>
