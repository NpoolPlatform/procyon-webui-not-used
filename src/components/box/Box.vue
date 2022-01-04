<template>
  <q-card class='common-card-container'>
    <q-card-section class='common-card-title'>
      <span>{{ cardTitle }}</span>

      <div v-if='showLink'>
        <a
          v-if='showEmail'
          class='link title-link'
          @click='showEmail = false;showPhone = true'
        >{{ $t('box.PhoneLink') }}</a>

        <a
          v-if='showPhone'
          class='link title-link'
          @click='showEmail = true;showPhone = false'
        >{{ $t('box.EmailLink') }}</a>
      </div>
    </q-card-section>
    <q-card-section class='form-container'>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script setup lang='ts'>
import { toRef, defineProps, withDefaults, computed } from 'vue'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/style/mutation-types'

const store = useStore()

interface Props {
  title: string,
  showLink?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  showLink: true
})
const cardTitle = toRef(props, 'title')
const showLink = toRef(props, 'showLink')

const showEmail = computed({
  get: () => store.getters.getShowEmail,
  set: (val) => {
    store.commit(MutationTypes.SetShowEmail, val)
  }
})

const showPhone = computed({
  get: () => store.getters.getShowPhone,
  set: (val) => {
    store.commit(MutationTypes.SetShowPhone, val)
  }
})
</script>

<style scoped>
.title-link {
  font-size: 12px;
  font-weight: 200;
  margin-right: 10px;
  cursor: pointer;
}

.form-container.q-card__section--vert {
  padding: 16px 0 !important;
}
</style>
