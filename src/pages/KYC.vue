<template>
  <div class='content'>HHHHHHHHHHHHHHHHHHHHHHHHHHHHHH</div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue'
import { CheckLogined } from 'src/utils/utils'

onMounted(() => {
  CheckLogined()
})
</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px;
  padding: 0 24px;
}
</style>
