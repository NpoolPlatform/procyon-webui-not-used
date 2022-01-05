<template>
  <q-dialog persistent v-model='showMe'>
    <q-card style='color: #e1eeef; background-color: #23292b;'>
      <q-card-section class='title-close-style row'>
        <div class='text-h6' style='margin-left: 10px'>
          {{ $t('legal.Title2') }}
        </div>
        <q-space />
        <q-btn
          icon='close'
          flat
          round
          dense
          @click='onDone(agree)'
          v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section class='scroll' style='max-height: 750px'>
        <div>
          <p>{{ $t('legal.P1') }}</p>
          <h5>{{ $t('legal.H1') }}</h5>
          <p>{{ $t('legal.P2') }}</p>
          <p>{{ $t('legal.P3') }}</p>
          <h5>{{ $t('legal.H2') }}</h5>
          <p>{{ $t('legal.P4') }}</p>
          <ul>
            <li>{{ $t('legal.U1.L1') }}</li>
            <li>{{ $t('legal.U1.L2') }}</li>
            <li>{{ $t('legal.U1.L3') }}</li>
            <li>{{ $t('legal.U1.L4') }}</li>
          </ul>
          <p>{{ $t('legal.P5') }}</p>
          <h5>{{ $t('legal.H3') }}</h5>
          <p>{{ $t('legal.P6') }}</p>
          <h5>{{ $t('legal.H4') }}</h5>
          <p>{{ $t('legal.P7') }}</p>
          <h5>{{ $t('legal.H5') }}</h5>
          <p>{{ $t('legal.P8') }}</p>
          <ul>
            <li>{{ $t('legal.U2.L1') }}</li>
            <li>{{ $t('legal.U2.L2') }}</li>
            <li>{{ $t('legal.U2.L3') }}</li>
            <li>{{ $t('legal.U2.L4') }}</li>
            <li>{{ $t('legal.U2.L5') }}</li>
            <li>{{ $t('legal.U2.L6') }}</li>
            <li>{{ $t('legal.U2.L7') }}</li>
            <li>{{ $t('legal.U2.L8') }}</li>
          </ul>
          <p>{{ $t('legal.P9') }}</p>
          <p>{{ $t('legal.P10') }}</p>
          <h4>{{ $t('legal.H6') }}</h4>
          <h5>{{ $t('legal.H7') }}</h5>
          <p>{{ $t('legal.P11') }}</p>
          <h5>{{ $t('legal.H8') }}</h5>
          <p>{{ $t('legal.P12') }}</p>
          <h6>{{ $t('legal.H9') }}</h6>
          <p>{{ $t('legal.P13') }}</p>
          <h6>{{ $t('legal.H10') }}</h6>
          <p>{{ $t('legal.P14') }}</p>
          <h6>{{ $t('legal.H11') }}</h6>
          <p>{{ $t('legal.P15') }}</p>
          <h6>{{ $t('legal.H12') }}</h6>
          <p>{{ $t('legal.P16') }}</p>
          <ul>
            <li>{{ $t('legal.U3.L1') }}</li>
            <li>{{ $t('legal.U3.L2') }}</li>
            <li>{{ $t('legal.U3.L3') }}</li>
            <li>{{ $t('legal.U3.L4') }}</li>
            <li>{{ $t('legal.U3.L5') }}</li>
            <li>{{ $t('legal.U3.L6') }}</li>
            <li>{{ $t('legal.U3.L7') }}</li>
            <li>{{ $t('legal.U3.L8') }}</li>
            <li>{{ $t('legal.U3.L9') }}</li>
            <li>{{ $t('legal.U3.L10') }}</li>
            <li>{{ $t('legal.U3.L11') }}</li>
            <li>{{ $t('legal.U3.L12') }}</li>
          </ul>
          <h6>{{ $t('legal.hh1') }}</h6>
          <p>{{ $t('legal.pp1') }}</p>
          <h5>{{ $t('legal.hh2') }}</h5>
          <p>{{ $t('legal.pp2') }}</p>
          <h5>{{ $t('legal.hh3') }}</h5>
          <p>{{ $t('legal.pp3') }}</p>
          <h5>{{ $t('legal.hh4') }}</h5>
          <p>{{ $t('legal.pp4') }}</p>
          <p>{{ $t('legal.pp5') }}</p>
          <h5>{{ $t('legal.hh5') }}</h5>
          <p>{{ $t('legal.pp6') }}</p>
          <h5>{{ $t('legal.hh6') }}</h5>
          <p>{{ $t('legal.pp7') }}</p>
          <h5>{{ $t('legal.hh7') }}</h5>
          <p>{{ $t('legal.pp8') }}</p>
          <h5>{{ $t('legal.hh8') }}</h5>
          <p>{{ $t('legal.pp9') }}</p>
          <p>{{ $t('legal.pp10') }}</p>
          <h5>{{ $t('legal.hh9') }}</h5>
          <p>{{ $t('legal.pp11') }}</p>
          <h5>{{ $t('legal.hh10') }}</h5>
          <p>{{ $t('legal.pp12') }}</p>
          <h5>{{ $t('legal.hh11') }}</h5>
          <p>
            {{ $t('legal.pp13') }}
            <a href='mailto:support@procyon.vip'>support@procyon.vip</a
            >{{ $t('legal.pp133') }}
          </p>

          <h4>{{ $t('legal.hhh1') }}</h4>
          <h5>{{ $t('legal.hhh2') }}</h5>
          <p>{{ $t('legal.ppp1') }}</p>
          <h5>{{ $t('legal.hhh3') }}</h5>
          <p>{{ $t('legal.ppp2') }}</p>
          <p>{{ $t('legal.ppp3') }}</p>

          <h5>{{ $t('legal.he1') }}</h5>
          <p>{{ $t('legal.pa1') }}</p>
          <p>{{ $t('legal.pa2') }}</p>
          <p>{{ $t('legal.pa3') }}</p>
          <p>{{ $t('legal.pa4') }}</p>
          <h5>{{ $t('legal.he2') }}</h5>
          <p>{{ $t('legal.pa5') }}</p>
          <p>{{ $t('legal.pa6') }}</p>
          <p>{{ $t('legal.pa7') }}</p>
          <h5>{{ $t('legal.he3') }}</h5>
          <p>{{ $t('legal.pa8') }}</p>
          <p>{{ $t('legal.pa9') }}</p>
          <p>{{ $t('legal.pa10') }}</p>
          <p>{{ $t('legal.pa11') }}</p>
          <h5>{{ $t('legal.he4') }}</h5>
          <p>{{ $t('legal.pa12') }}</p>
          <p>{{ $t('legal.pa13') }}</p>
          <p>{{ $t('legal.pa14') }}</p>
          <h5>{{ $t('legal.he5') }}</h5>
          <p>{{ $t('legal.pa15') }}</p>
          <p>{{ $t('legal.pa16') }}</p>
          <p>{{ $t('legal.pa17') }}</p>
          <h5>{{ $t('legal.he6') }}</h5>
          <p>{{ $t('legal.pa18') }}</p>
          <p>{{ $t('legal.pa19') }}</p>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align='right'>
        <q-btn
          flat
          :label="$t('button.Cancel')"
          color='primary'
          @click="onDone(false)"
          v-close-popup
        />
        <q-btn
          flat
          :label="$t('button.Confirm')"
          color='primary'
          @click="onDone(true)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang='ts'>
import { defineEmits, defineProps, withDefaults, toRef } from 'vue'

interface Props {
  show: boolean
  agree: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  agree: false
})

const showMe = toRef(props, 'show')
const agree = toRef(props, 'agree')

const emit = defineEmits<{(e: 'update:agree', value: boolean): void, (e: 'update:show', value: boolean): void }>()

function onDone (agree: boolean) {
  emit('update:agree', agree)
  emit('update:show', false)
}

</script>

<style scoped>
.title-close-style {
  text-align: right;
}
</style>
