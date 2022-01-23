<template>
  <q-card class='kyc-bg'>
    <span class='kyc-document-text'>
      {{ $t('general.DocumentType').toUpperCase() }}
    </span>
    <q-item>
      <q-select
        class='kyc-select'
        borderless
        v-model='documentLabel'
        :options='documentTypes'
      />
    </q-item>
    <q-item class='kyc-document'>
      <q-card flat class='kyc-image-container rounded-borders'>
        <q-item>
          <q-img class='kyc-image rounded-borders cursor-pointer' :src='kycFrontImg' />
        </q-item>
        <q-item class='kyc-image-text-container'>
          <span class='text-center kyc-image-text'>
            {{ $t('general.Upload').toUpperCase() }}
          </span>
        </q-item>
      </q-card>
      <q-space class='kyc-space' />
      <q-card flat class='kyc-image-container rounded-borders'>
        <q-item>
          <q-img class='kyc-image rounded-borders cursor-pointer' :src='kycBackImg' />
        </q-item>
        <q-item class='kyc-image-text-container'>
          <span class='text-center kyc-image-text'>
            {{ $t('general.Upload').toUpperCase() }}
          </span>
        </q-item>
      </q-card>
      <q-space class='kyc-space' />
      <q-card flat class='kyc-image-container rounded-borders'>
        <q-item>
          <q-img class='kyc-image rounded-borders cursor-pointer' :src='kycHandingImg' />
        </q-item>
        <q-item class='kyc-image-text-container'>
          <span class='text-center kyc-image-text'>
            {{ $t('general.Upload').toUpperCase() }}
          </span>
        </q-item>
      </q-card>
    </q-item>
  </q-card>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { DocumentType } from 'src/store/kycs/const'

import kycFrontImg from 'src/assets/kyc-id-front.svg'
import kycBackImg from 'src/assets/kyc-id-back.svg'
import kycHandingImg from 'src/assets/kyc-selfie-id.svg'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const documentTypes = ref([
  {
    label: t('general.IDCard'),
    value: DocumentType.IDCard
  }, {
    label: t('general.Passport'),
    value: DocumentType.Passport
  }
])
const documentLabel = ref(t('general.IDCard'))

/*
const documentType = computed(() => {
  for (let i = 0; i < documentTypes.value.length; i++) {
    if (documentLabel.value === documentTypes.value[i].label) {
      return documentTypes.value[i].value
    }
  }
  return DocumentType.IDCard
})
*/

</script>

<style scoped>
.kyc-bg {
  max-width: 100%;
  background: linear-gradient(to bottom right,rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%);
  margin: 10px;
  padding: 36px 0 16px 10px;
  border-radius: 16px;
}

.kyc-state-icon {
  width: 36px;
  height: 36px;
}

.kyc-select {
  background-color: white;
  border-radius: 16px;
  width: 300px;
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
}

.kyc-document-text {
  line-height: 36px;
  font-size: 20px;
  font-weight: 600;
  margin-left: 14px;
}

.kyc-image-container {
  border: dashed 1px green;
  border-radius: 32px;
  max-width: 32.3%;
  min-width: 32.3%;
  background-color: transparent;
}

.kyc-space {
  max-width: 24px;
}

.kyc-image-text {
  color: #bbbbbb;
  font-weight: 500;
  line-height: 24px;
  width: 100%;
}

.kyc-image-text-container {
  padding: 0;
  margin: 0;
}

.kyc-document {
  margin-top: 36px;
  margin-right: 10px;
}

.kyc-image {
  max-width: 92%;
  margin-left: 4%;
  margin-top: 6%;
}
</style>
