<template>
  <q-dialog
    v-model='persistent'
    persistent
    transition-show='scale'
    transition-hide='scale'
  >
    <q-card class='text-white warning-bk' style='width: 300px'>
      <q-card-section>
        <div class='text-h6 common-card-title'>{{ $t('notice.Title') }}</div>
      </q-card-section>

      <q-card-section class='q-pt-none'>{{
          $t('notice.Content')
        }}
      </q-card-section>
      <q-card-section class='q-pt-none'>{{
          $t('notice.P1')
        }}
      </q-card-section>
      <q-card-section class='q-pt-none'>{{
          $t('notice.P2')
        }}
      </q-card-section>

      <q-card-actions align='between' class='text-teal'>
        <div class='button-group'>
          <q-btn-toggle
            v-model='locale'
            push
            glossy
            toggle-color='orange-9'
            :options="[
                { label: $t('footer.Forth.En'), value: 'en-US' },
                { label: $t('footer.Forth.Jp'), value: 'ja-JP' },
              ]"
          />
        </div>
        <q-btn
          flat
          label='OK'
          @click="
              persistent = !persistent;
              $router.push('/');
            "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })
const persistent = ref(true)
</script>

<style scoped>
.warning-bk {
  background: #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 24px;
  margin: 24px;
  position: relative;
}
</style>
