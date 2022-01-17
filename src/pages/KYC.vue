<template>
  <div class='content'>
    <div class='section-part-title'>{{ $t('general.KYCStatus') }}</div>
    <div class='row'>
      <q-space />
      <span class='kyc-status'>{{ kycStatus }}</span>
      <q-space />
    </div>
    <div class='row'>
      <q-space />
      <span v-if='kycInfo.State === State.Rejected' class='kyc-reject-reason'>{{ kycInfo.Message }}</span>
      <q-space />
    </div>
    <div class='hr-t'></div>
    <div class='section-part-title'>{{ $t('general.KYCImages') }}</div>
    <div>
      <input ref='selectFrontImgFile' type='file' style='display: none;' @change='onFrontImgSelected' accept='image/jpeg, image/png, image/jpg' />
      <input ref='selectBackImgFile' type='file' style='display: none;' @change='onBackImgSelected' accept='image/jpeg, image/png, image/jpg' />
      <input ref='selectHandingImgFile' type='file' style='display: none;' @change='onHandingImgSelected' accept='image/jpeg, image/png, image/jpg' />
      <div class='row'>
        <q-img class='kyc-image rounded-borders cursor-pointer' @click='onFrontImgClick' :src='img2src(frontImg) as string' :ratio='1'>
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ $t('general.FrontImage') }}
          </div>
        </q-img>
        <q-img class='kyc-image rounded-borders cursor-pointer' @click='onBackImgClick' :src='img2src(backImg) as string' :ratio='1'>
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ $t('general.BackImage') }}
          </div>
        </q-img>
        <q-img class='kyc-image rounded-borders cursor-pointer' @click='onHandingImgClick' :src='img2src(handingImg) as string' :ratio='1'>
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ $t('general.HandingImage') }}
          </div>
        </q-img>
      </div>
      <div class='kyc-submit-container'>
        <q-btn
          class='common-button save-button'
          @click='onSubmit'
          :disable='kycInfo.State === State.Verified'
        >{{ $t('general.Submit') }}
        </q-btn>
      </div>
    </div>
    <div class='hr-t'></div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, onUnmounted } from 'vue'
import { CheckLogined } from 'src/utils/utils'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as KYCActionTypes } from 'src/store/kycs/action-types'
import { MutationTypes as KYCMutationTypes } from 'src/store/kycs/mutation-types'
import { KYC, KYCImage } from 'src/store/kycs/types'
import { ImageType, State } from 'src/store/kycs/const'
import { useQuasar, uid } from 'quasar'

const store = useStore()

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const kycInfo = computed(() => store.getters.getKYCInfo)

const kycStatus = computed(() => {
  switch (kycInfo.value.State) {
    case State.NotVerified:
      return t('general.NotVerified')
    case State.Verified:
      return t('general.Verified')
    case State.Wait:
      return t('general.Wait')
    case State.Rejected:
      return t('general.Rejected')
    default:
      return t('general.NotVerified')
  }
})

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

const img2src = (img: KYCImage) => {
  return img.Base64 === undefined ? ref('icons/icon-512x512.png') : img.Base64
}

type Base64Handler = (base64: string) => void

// TODO: limit photo size
// TODO: limit file format to be a photo

const toBase64 = (filename: Blob, onLoaded: Base64Handler) => {
  const reader = new FileReader()
  reader.onloadend = function () {
    onLoaded(reader.result as string)
  }
  reader.readAsDataURL(filename)
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
  if (kycInfo.value.State === State.Verified) {
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
  if (kycInfo.value.State === State.Verified) {
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
  if (kycInfo.value.State === State.Verified) {
    return
  }
  selectBackImgFile.value?.click()
}

const q = useQuasar()

const onSubmit = () => {
  store.dispatch(KYCActionTypes.UploadKYCImage, {
    AppID: q.cookies.get('AppID'),
    UserID: q.cookies.get('UserID'),
    ImageType: ImageType.Front,
    ImageBase64: frontImg.value.Base64 as string
  })
}

type FunctionVoid = () => void
const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === KYCMutationTypes.SetKYCFrontImage) {
      store.dispatch(KYCActionTypes.UploadKYCImage, {
        AppID: q.cookies.get('AppID'),
        UserID: q.cookies.get('UserID'),
        ImageType: ImageType.Back,
        ImageBase64: backImg.value.Base64 as string
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
      if (kycInfo.value.Kyc === undefined) {
        store.dispatch(KYCActionTypes.CreateKYC, {
          Info: {
            AppID: q.cookies.get('AppID'),
            UserID: q.cookies.get('UserID'),
            CardType: 'passport',
            CardID: 'DONOTNEEDCARDIDINPUTFROMUSER-' + uid(),
            FrontCardImg: frontImg.value.URI,
            BackCardImg: backImg.value.URI,
            UserHandingCardImg: handingImg.value.URI
          }
        })
      } else {
        store.dispatch(KYCActionTypes.UpdateKYC, {
          Info: {
            ID: kycInfo.value.Kyc.ID,
            AppID: q.cookies.get('AppID'),
            UserID: q.cookies.get('UserID'),
            CardType: 'passport',
            CardID: kycInfo.value.Kyc.CardID,
            FrontCardImg: frontImg.value.URI,
            BackCardImg: backImg.value.URI,
            UserHandingCardImg: handingImg.value.URI
          }
        })
      }
    }

    if (mutation.type === KYCMutationTypes.SetKYCInfo) {
      const kyc = mutation.payload as KYC

      store.dispatch(KYCActionTypes.GetKYCImage, {
        ImageType: ImageType.Front,
        URI: kyc.Kyc?.FrontCardImg,
        ImageS3Key: kyc.Kyc?.FrontCardImg
      })

      store.dispatch(KYCActionTypes.GetKYCImage, {
        ImageType: ImageType.Back,
        URI: kyc.Kyc?.BackCardImg,
        ImageS3Key: kyc.Kyc?.BackCardImg
      })

      store.dispatch(KYCActionTypes.GetKYCImage, {
        ImageType: ImageType.Handing,
        URI: kyc.Kyc?.UserHandingCardImg,
        ImageS3Key: kyc.Kyc?.UserHandingCardImg
      })
    }
  })

  if (CheckLogined()) {
    store.dispatch(KYCActionTypes.GetKYCInfo)
  }
})

onUnmounted(() => {
  unsubscribe.value?.()
})

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

.kyc-reject-reason {
  font-size: 14px;
  color: red;
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
