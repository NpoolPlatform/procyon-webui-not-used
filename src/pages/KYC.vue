<template>
  <div class='content'>
    <div class='section-part-title'>{{ $t('general.KYCStatus') }}</div>
    <div class='row'>
      <q-space />
      <span class='kyc-status'>{{ kycStatus }}</span>
      <q-space />
    </div>
    <div class='hr-t'></div>
    <div class='section-part-title'>{{ $t('general.KYCImages') }}</div>
    <div>
      <div class='row'>
        <q-img class='kyc-image rounded-borders cursor-pointer' @click='onFrontImgClick' :src='frontImg' :ratio='1'>
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ $t('general.FrontImage') }}
          </div>
        </q-img>
        <q-img class='kyc-image rounded-borders cursor-pointer' @click='onBackImgClick' :src='backImg' :ratio='1'>
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ $t('general.BackImage') }}
          </div>
        </q-img>
        <q-img class='kyc-image rounded-borders cursor-pointer' @click='onHandingImgClick' :src='handingImg' :ratio='1'>
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ $t('general.HandingImage') }}
          </div>
        </q-img>
      </div>
      <div class='kyc-submit-container'>
        <q-btn
          class='common-button save-button'
        >{{ $t('general.Submit') }}
        </q-btn>
      </div>
    </div>
    <div class='hr-t'></div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { CheckLogined } from 'src/utils/utils'
import { useI18n } from 'vue-i18n'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const kycStatus = ref(t('general.NotVerified'))

const frontImg = ref('icons/icon-512x512.png')
const backImg = ref('icons/icon-512x512.png')
const handingImg = ref('icons/icon-512x512.png')

onMounted(() => {
  CheckLogined()
})

const onHandingImgClick = () => {
  console.log('handing')
}

const onFrontImgClick = () => {
  console.log('front')
}

const onBackImgClick = () => {
  console.log('back')
}

</script>

<style scoped>
.content {
  max-width: 100%;
  margin: 0 72px;
  padding: 0 24px;
}

.kyc-status {
  font-size: 28px;
}

.kyc-image {
  max-width: 31%;
  background: linear-gradient(to bottom right,rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%);
  margin: 10px;
}

.kyc-submit-container {
  width: 31%;
  margin: 24px 0px 0px 10px;
}

.save-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  line-height: 22px;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
}
</style>
