<template>
  <q-dialog v-model='show' persistent>
    <q-card class='common-card-container' style='background: #23292b !important;'>
      <q-card-section>
        <span class='common-card-title'>{{ dialogTitle }}</span>
      </q-card-section>

      <slot name='content'></slot>

      <q-card-section>
        <q-form @submit="$emit('verify', verifyCode)">
          <slot name='email-input'></slot>
          <q-input
            :rules='verifyCodeRules'
            lazy-rules
            bg-color='blue-grey-2'
            class='common-input'
            outlined
            v-model='verifyCode'
            :label="$t('input.VerifyCode')"
          ></q-input>

          <q-btn class='common-button verify-button' type='submit' :label='$t("button.Verify")'></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults, defineEmits, ref, computed, toRef, watch } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

interface Props {
  showDialog: boolean
  dialogTitle: string
}

const props = withDefaults(defineProps<Props>(), {
  showDialog: false,
  dialogTitle: ''
})
const show = toRef(props, 'showDialog')
const dialogTitle = toRef(props, 'dialogTitle')
const emit = defineEmits<{(e: 'update:showDialog', value: boolean): void, (e: 'verify', value: string): void }>()

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const router = useRouter()

const store = useStore()

const verifyCode = ref('')

const verifyCodeRules = ref([
  (val: string) => (val && val.length > 0) || t('input.VerifyCodeWarning')
])

const loginVerify = computed(() => store.getters.getLoginVerify)

watch(loginVerify, (n, o) => {
  if (n && !o) {
    emit('update:showDialog', false)
    void router.push('/account')
  }
})
</script>

<style scoped>
.card-content {
  margin: 10px 10px 0 10px;
  padding: 0 0 0 0;
  color: #e1eeef;
  font-size: 18px;
}

.verify-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 1px solid #ff964a;
  margin: 0 0 10px 0;
  width: 100%;
  text-align: center;
}
</style>
