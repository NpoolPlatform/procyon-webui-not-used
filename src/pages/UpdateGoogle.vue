<template>
  <BackConfirm>
    <Box :dense='true' :title="$t('account.Setting.Google.Title')" :always-selectable="false" :show-link="false">
      <EnableGoogle />
    </Box>
  </BackConfirm>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const Box = defineAsyncComponent(() => import('src/components/box/Box.vue'))
const BackConfirm = defineAsyncComponent(() => import('src/components/page/BackConfirm.vue'))
const EnableGoogle = defineAsyncComponent(() => import('components/dialog/setting/EnableGoogle.vue'))

</script>

<style lang='sass' scoped>
.common-card-container
  max-width: 840px

::v-deep .form-container
  max-width: 840px !important
</style>
