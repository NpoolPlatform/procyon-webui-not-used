<template>
  <q-card dense class='dialog-box'>
    <q-card-section class='scroll' style='max-height: 750px;'>
      <div>
        <div style='text-align: center; margin-bottom: 10px;'>
          <qrcode-vue class='img-style' :value='userGoogleInfo.OTPAuth' :size='250' />
        </div>
        <div class='secret-style'>
          Google Secret: {{ userGoogleInfo.Secret }}
        </div>

        <q-separator />

        <div class='tip'>
          <p>{{ $t('GoogleAuthentication.Content1') }}</p>
          <p>{{ $t('GoogleAuthentication.Content2') }}</p>
          <p>{{ $t('GoogleAuthentication.Content3') }}</p>
          <p>{{ $t('GoogleAuthentication.L1') }}</p>
          <p>{{ $t('GoogleAuthentication.L2') }}</p>
          <p>{{ $t('GoogleAuthentication.L3') }}</p>
          <p>{{ $t('GoogleAuthentication.L4') }}</p>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align='right' class='text-primary'>
      <q-btn
        flat
        :label="$t('GoogleAuthentication.NextStepBtn')"
        @click='onNextStepClick'
      />
      <q-btn
        flat
        :label="$t('GoogleAuthentication.CloseBtn')"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang='ts'>
import { computed, defineAsyncComponent } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'src/router'

const QrcodeVue = defineAsyncComponent(() => import('qrcode.vue'))

const store = useStore()

const userGoogleInfo = computed(() => store.getters.getGoogleAuthenticationInfo)

const router = useRouter()

const onNextStepClick = () => {
  void router.push({ path: '/verify/google' })
}

</script>

<style scoped>
.dialog-box {
  background-color: transparent;
  box-shadow: none;
  color: #e1eeef;
  line-height: 100%;
  max-width: 760px;
  padding: 0
}

p {
  line-height: 150% !important;
}

.dialog-header {
  display: flex;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 34px;
  color: black;
  justify-content: space-between;
}

.dialog-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  width: 100%;
}

.content-style {
  color: black;
  font-weight: 600;
  font-size: 18px;
}

.img-style {
  background-color: white;
  width: 200px;
  height: 200px;
  padding: 10px;
  text-align: center;
}

.secret-style {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.tip {
  padding-top: 24px;
}
</style>
