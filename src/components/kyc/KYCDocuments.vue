<template>
  <q-card class='content-glass kyc-documents'>
    <div class='document-select column'>
      <span class='kyc-document-text'>
        {{ $t('general.DocumentType').toUpperCase() }}
      </span>
      <q-btn-dropdown
        class='kyc-select'
        flat
        dense
        no-caps
        unelevated
        align='between'
        auto-close
        :label='documentLabel.label'
        :disable='kycState === State.Verified'
      >
        <q-list>
          <q-item
            dense
            class='kyc-select-item'
            clickable
            v-for='type in documentTypes'
            :key='type.value'
            @click="() => onDocumentTypeSelected(type)"
          >
            <q-item-section>
              <q-item-label>{{ type.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div class='row document-select'>
      <input ref='selectFrontImgFile' type='file' style='display: none;' @change='onFrontImgSelected' accept='image/jpeg, image/png, image/jpg' />
      <input ref='selectBackImgFile' type='file' style='display: none;' @change='onBackImgSelected' accept='image/jpeg, image/png, image/jpg' />
      <input ref='selectHandingImgFile' type='file' style='display: none;' @change='onHandingImgSelected' accept='image/jpeg, image/png, image/jpg' />
      <div class="kyc-upload">
        <div class="kyc-image">
          <q-img class='kyc-image-img' @click='onFrontImgClick' :src='img2src(frontImg, ImageType.Front)' :ratio='640/426.67' />
          <span>{{ $t('general.Upload').toUpperCase() }}</span>
        </div>
        <div class="kyc-instructions">
          <h4 v-if='documentType === DocumentType.IDCard'>{{ $t('general.IDFront') }}</h4>
          <h4 v-else>{{ $t('general.PassportPhotoPage') }}</h4>
          <p v-if='documentType === DocumentType.IDCard' class="kyc-note" v-html='$t("general.IDFrontHint")' />
          <p v-else class="kyc-note" v-html='$t("general.PassportPhotoHint")' />
        </div>
      </div>
      <div v-if='documentType === DocumentType.IDCard' class="kyc-upload">
        <div class="kyc-image">
          <q-img class='kyc-image-img' @click='onBackImgClick' :src='img2src(backImg, ImageType.Back)' :ratio='640/426.67' />
          <span>{{ $t('general.Upload').toUpperCase() }}</span>
        </div>
        <div class="kyc-instructions">
          <h4>{{ $t('general.IDBack') }}</h4>
          <p class="kyc-note" v-html='$t("general.IDBackHint")' />
        </div>
      </div>
      <div class="kyc-upload">
        <div class="kyc-image">
          <q-img class='kyc-image-img' @click='onHandingImgClick' :src='img2src(handingImg, ImageType.Handing)' :ratio='640/426.67' />
          <span>{{ $t('general.Upload').toUpperCase() }}</span>
        </div>
        <div class="kyc-instructions">
          <h4 v-if='documentType === DocumentType.IDCard'>{{ $t('general.IDHanding') }}</h4>
          <h4 v-else>{{ $t('general.PassportHanding') }}</h4>
          <p v-if='documentType === DocumentType.IDCard' class="kyc-note" v-html='$t("general.IDHandingHint")' />
          <p v-else class="kyc-note" v-html='$t("general.PassportHandingHint")' />
        </div>
      </div>
    </div>
    <div class='hr-t'></div>
    <div class="kyc-submit">
      <h4>{{ $t('general.ConfirmBeforeSubmit') }}</h4>
      <span v-html='$t("general.IDSubmitConfirmation")' />
      <div class='kyc-submit-container'>
        <q-btn
          class='common-button save-button'
          @click='onSubmit'
          :disable='kycState === State.Verified'
        >{{ $t('general.SubmitDocuments') }}
        </q-btn>
      </div>
    </div>
  </q-card>
</template>

<script setup lang='ts'>
import { ref, withDefaults, defineProps, toRef, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar, uid, throttle } from 'quasar'
import Compressor from 'compressorjs'

import { DocumentType, ImageType, State } from 'src/store/kycs/const'

import kycFrontImg from 'src/assets/kyc-id-front.svg'
import kycBackImg from 'src/assets/kyc-id-back.svg'
import kycHandingImg from 'src/assets/kyc-selfie-id.svg'
import { useStore } from 'src/store'
import { KYC, KYCImage } from 'src/store/kycs/types'
import { MutationTypes as KYCMutationTypes } from 'src/store/kycs/mutation-types'
import { ActionTypes as KYCActionTypes } from 'src/store/kycs/action-types'
import { ThrottleDelay, RequestMessageToNotifyMessage } from 'src/utils/utils'
import { MutationTypes as NotifyMutationTypes } from 'src/store/notify/mutation-types'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })
const store = useStore()

interface Props {
  kycInfo?: KYC
}

const props = withDefaults(defineProps<Props>(), {})
const kycInfo = toRef(props, 'kycInfo')

const kycState = computed(() => {
  if (kycInfo.value) {
    return kycInfo.value.State
  }
  return State.NotVerified
})

interface DocTypeItem {
  label: string
  value: DocumentType
}

const documentTypes = ref([
  {
    label: t('general.IDCard'),
    value: DocumentType.IDCard
  } as DocTypeItem, {
    label: t('general.Passport'),
    value: DocumentType.Passport
  } as DocTypeItem
])

const myDocumentType = (kycInfo: KYC) => {
  if (!kycInfo) {
    return documentTypes.value[0]
  }
  for (let i = 0; i < documentTypes.value.length; i++) {
    if (kycInfo.Kyc?.CardType === documentTypes.value[i].value) {
      return documentTypes.value[i]
    }
  }
  return documentTypes.value[0]
}

const documentLabel = ref(myDocumentType(kycInfo.value as KYC))
const documentType = computed(() => documentLabel.value.value)

const onDocumentTypeSelected = (type: DocTypeItem) => {
  documentLabel.value = type
}

const frontImg = computed({
  get: () => store.getters.getKYCFrontImage,
  set: (val: KYCImage) => {
    store.commit(KYCMutationTypes.SetLocalKYCFrontImage, val)
  }
})

const backImg = computed({
  get: () => store.getters.getKYCBackImage,
  set: (val: KYCImage) => {
    store.commit(KYCMutationTypes.SetLocalKYCBackImage, val)
  }
})

const handingImg = computed({
  get: () => store.getters.getKYCHandingImage,
  set: (val: KYCImage) => {
    store.commit(KYCMutationTypes.SetLocalKYCHandingImage, val)
  }
})

const selectFrontImgFile = ref<HTMLDivElement>()
const selectBackImgFile = ref<HTMLDivElement>()
const selectHandingImgFile = ref<HTMLDivElement>()

const img2src = (img: KYCImage, type: ImageType) => {
  if (img.Base64) {
    return img.Base64
  }
  switch (type) {
    case ImageType.Front:
      return kycFrontImg
    case ImageType.Back:
      return kycBackImg
    case ImageType.Handing:
      return kycHandingImg
  }
}

type Base64Handler = (base64: string) => void

// TODO: limit photo size
// TODO: limit file format to be a photo

const toBase64 = (filename: File, onLoaded: Base64Handler) => {
  const maxSize = 4000000
  // eslint-disable-next-line no-new
  new Compressor(filename, {
    convertSize: maxSize,
    success (result: Blob) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if ((reader.result as string).length > maxSize) {
          store.commit(NotifyMutationTypes.PushMessage,
            RequestMessageToNotifyMessage('Size of ' + filename.name + ' > ' + maxSize.toString(), '', 'negative'))
          return
        }
        onLoaded(reader.result as string)
      }
      reader.readAsDataURL(result)
    },
    error (err: Error) {
      console.log('fail compress', filename, err)
    }
  })
}

const onHandingImgSelected = (evt: Event) => {
  const target = evt.target as unknown as HTMLInputElement
  if (target.files) {
    const filename = target.files[0]
    toBase64(filename, function (base64: string) {
      handingImg.value = {
        ImageType: ImageType.Front,
        URI: filename.name,
        Base64: base64
      }
    })
  }
}

const onHandingImgClick = () => {
  if (kycState.value === State.Verified) {
    return
  }
  selectHandingImgFile.value?.click()
}

const onFrontImgSelected = (evt: Event) => {
  const target = evt.target as unknown as HTMLInputElement
  if (target.files) {
    const filename = target.files[0]
    toBase64(filename, function (base64: string) {
      frontImg.value = {
        ImageType: ImageType.Front,
        URI: filename.name,
        Base64: base64
      }
    })
  }
}

const onFrontImgClick = () => {
  if (kycState.value === State.Verified) {
    return
  }
  selectFrontImgFile.value?.click()
}

const onBackImgSelected = (evt: Event) => {
  const target = evt.target as unknown as HTMLInputElement
  if (target.files) {
    const filename = target.files[0]
    toBase64(filename, function (base64: string) {
      backImg.value = {
        ImageType: ImageType.Front,
        URI: filename.name,
        Base64: base64
      }
    })
  }
}

const onBackImgClick = () => {
  if (kycState.value === State.Verified) {
    return
  }
  selectBackImgFile.value?.click()
}

const q = useQuasar()

const onSubmit = throttle(() => {
  store.dispatch(KYCActionTypes.UploadKYCImage, {
    AppID: q.cookies.get('AppID'),
    UserID: q.cookies.get('UserID'),
    ImageType: ImageType.Front,
    ImageBase64: frontImg.value.Base64 as string
  })
}, ThrottleDelay * 3)

type FunctionVoid = () => void
const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === KYCMutationTypes.SetKYCFrontImage) {
      const imageType = documentType.value === DocumentType.IDCard ? ImageType.Back : ImageType.Handing
      const image = documentType.value === DocumentType.IDCard ? backImg : handingImg
      store.dispatch(KYCActionTypes.UploadKYCImage, {
        AppID: q.cookies.get('AppID'),
        UserID: q.cookies.get('UserID'),
        ImageType: imageType,
        ImageBase64: image.value.Base64 as string
      })
    }

    if (mutation.type === KYCMutationTypes.SetKYCBackImage) {
      store.dispatch(KYCActionTypes.UploadKYCImage, {
        AppID: q.cookies.get('AppID'),
        UserID: q.cookies.get('UserID'),
        ImageType: ImageType.Handing,
        ImageBase64: handingImg.value.Base64 as string
      })
    }

    if (mutation.type === KYCMutationTypes.SetKYCHandingImage) {
      if (kycState.value === State.NotVerified) {
        store.dispatch(KYCActionTypes.CreateKYC, {
          Info: {
            AppID: q.cookies.get('AppID'),
            UserID: q.cookies.get('UserID'),
            CardType: documentType.value,
            CardID: 'DONOTNEEDCARDIDINPUTFROMUSER-' + uid(),
            FrontCardImg: frontImg.value.URI,
            BackCardImg: backImg.value.URI,
            UserHandingCardImg: handingImg.value.URI
          }
        })
      } else {
        store.dispatch(KYCActionTypes.UpdateKYC, {
          Info: {
            ID: kycInfo.value?.Kyc?.ID,
            AppID: q.cookies.get('AppID'),
            UserID: q.cookies.get('UserID'),
            CardType: documentType.value,
            CardID: kycInfo.value?.Kyc?.CardID,
            FrontCardImg: frontImg.value.URI,
            BackCardImg: backImg.value.URI,
            UserHandingCardImg: handingImg.value.URI
          }
        })
      }
    }

    if (mutation.type === KYCMutationTypes.SetKYCInfo) {
      const kyc = mutation.payload as KYC

      documentLabel.value = myDocumentType(kycInfo.value as KYC)

      store.dispatch(KYCActionTypes.GetKYCImage, {
        ImageType: ImageType.Front,
        URI: kyc.Kyc?.FrontCardImg,
        ImageS3Key: kyc.Kyc?.FrontCardImg
      })

      if (documentLabel.value.value === DocumentType.IDCard) {
        store.dispatch(KYCActionTypes.GetKYCImage, {
          ImageType: ImageType.Back,
          URI: kyc.Kyc?.BackCardImg,
          ImageS3Key: kyc.Kyc?.BackCardImg
        })
      }

      store.dispatch(KYCActionTypes.GetKYCImage, {
        ImageType: ImageType.Handing,
        URI: kyc.Kyc?.UserHandingCardImg,
        ImageS3Key: kyc.Kyc?.UserHandingCardImg
      })
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>

<style scoped>
.content-glass {
  background: linear-gradient(to bottom right, rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%);
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 24px;
  margin: 24px;
}

.kyc-documents {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.document-select {
  width: 100%;
}

.kyc-select {
  background-color: #e1eeef;
  border: solid 2px transparent;
  border-radius: 12px;
  width: 240px;
  font-size: 14px;
  font-weight: 400;
  margin: 8px 0 24px 0;
  color: #23292b;
  padding-left: 10px;
}

.kyc-select-item {
  color: #23292b;
  line-height: 20px;
}

.kyc-select:hover {
  border: solid 2px #1ec498;
}

.kyc-upload {
  margin: 0 3% 0 0;
  width: 30%;
}

.kyc-document-text {
  line-height: 36px;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
}

.kyc-image {
  border: 1px dashed #11afaf;
  border-radius: 32px;
  cursor: pointer;
  margin: 24px 0;
  padding: 24px 24px 0px 24px;
  text-align: center;
}

.kyc-image span {
  line-height: 2;
  opacity: .7;
  text-transform: uppercase;
}

.kyc-image-img {
  opacity: .5;
  transition: all ease-in-out .1s;
  width: 100%;
  border-radius: 12px;
}

.kyc-image-img:hover {
  opacity: 1;
}

.kyc-image:hover span {
  opacity: 1;
}

::v-deep strong {
  color: #1ec498;
  filter: contrast(1.5);
}

.kyc-note {
  font-size: 18px;
  font-weight: 300;
  line-height: 28px;
}

.kyc-submit {
  width: 100%;
}

.kyc-submit p {
  background: #ffffff22;
  border-radius: 12px;
  font-size: 18px;
  line-height: 28px;
  min-width: 400px;
  padding: 8px 16px;
  width: 70%;
}

.kyc-submit button {
  margin: 16px 16px 16px 0;
  min-width: 220px;
}

.kyc-documents .hr {
  margin: 24px 0;
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
  margin: 16px 16px 16px 0;
  width: 220px;
}
</style>
