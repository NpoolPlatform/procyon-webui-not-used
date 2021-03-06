import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { KYCMutations } from './mutations'
import { MutationTypes as KYCMutationTypes } from './mutation-types'
import { KYCState } from './state'
import { post } from 'src/boot/axios'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage } from 'src/utils/utils'
import { useI18n } from 'boot/i18n'
import { CreateKYCRequest, CreateKYCResponse, GetKYCImageRequest, GetKYCImageResponse, GetKYCResponse, UpdateKYCRequest, UpdateKYCResponse, UploadKYCImageRequest, UploadKYCImageResponse } from './types'
import { API, ImageType } from './const'

// use public api
interface KYCActions {
  [ActionTypes.GetKYCInfo] ({
    commit
  }: AugmentedActionContext<KYCState,
    RootState,
    KYCMutations<KYCState>>): void

  [ActionTypes.GetKYCImage] ({
    commit
  }: AugmentedActionContext<KYCState,
    RootState,
    KYCMutations<KYCState>>,
    payload: GetKYCImageRequest): void

  [ActionTypes.UploadKYCImage] ({
    commit
  }: AugmentedActionContext<KYCState,
    RootState,
    KYCMutations<KYCState>>,
    payload: UploadKYCImageRequest): void

  [ActionTypes.CreateKYC] ({
    commit
  }: AugmentedActionContext<KYCState,
    RootState,
    KYCMutations<KYCState>>,
    payload: CreateKYCRequest): void

  [ActionTypes.UpdateKYC] ({
    commit
  }: AugmentedActionContext<KYCState,
    RootState,
    KYCMutations<KYCState>>,
    payload: UpdateKYCRequest): void
}

const actions: ActionTree<KYCState, RootState> = {
  [ActionTypes.GetKYCInfo] ({ commit }) {
    post<unknown, GetKYCResponse>(API.GET_KYC_INFO, {})
      .then((resp: GetKYCResponse) => {
        commit(KYCMutationTypes.SetKYCInfo, resp.Info)
      })
      .catch((err: Error) => {
        console.log(err)
      })
  },

  [ActionTypes.GetKYCImage] ({ commit }, payload: GetKYCImageRequest) {
    const { t } = useI18n()
    post<GetKYCImageRequest, GetKYCImageResponse>(API.GET_KYC_IMAGE, {
      ImageS3Key: payload.ImageS3Key
    })
      .then((resp: UploadKYCImageResponse) => {
        switch (payload.ImageType) {
          case ImageType.Front:
            commit(KYCMutationTypes.SetLocalKYCFrontImage, {
              ImageType: ImageType.Front,
              URI: payload.ImageS3Key,
              Base64: resp.Info
            })
            break
          case ImageType.Back:
            commit(KYCMutationTypes.SetLocalKYCBackImage, {
              ImageType: ImageType.Back,
              URI: payload.ImageS3Key,
              Base64: resp.Info
            })
            break
          case ImageType.Handing:
            commit(KYCMutationTypes.SetLocalKYCHandingImage, {
              ImageType: ImageType.Handing,
              URI: payload.ImageS3Key,
              Base64: resp.Info
            })
            break
        }
      })
      .catch((err: Error) => {
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('general.GetKYCFail'), err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, {
          key: '',
          value: false
        })
      })
  },

  [ActionTypes.UploadKYCImage] ({ commit }, payload: UploadKYCImageRequest) {
    const { t } = useI18n()
    post<UploadKYCImageRequest, UploadKYCImageResponse>(API.UPLOAD_KYC_IMAGE, payload)
      .then((resp: UploadKYCImageResponse) => {
        switch (payload.ImageType) {
          case ImageType.Front:
            commit(KYCMutationTypes.SetKYCFrontImage, {
              ImageType: ImageType.Front,
              URI: resp.Info,
              Base64: payload.ImageBase64
            })
            break
          case ImageType.Back:
            commit(KYCMutationTypes.SetKYCBackImage, {
              ImageType: ImageType.Back,
              URI: resp.Info,
              Base64: payload.ImageBase64
            })
            break
          case ImageType.Handing:
            commit(KYCMutationTypes.SetKYCHandingImage, {
              ImageType: ImageType.Handing,
              URI: resp.Info,
              Base64: payload.ImageBase64
            })
            break
        }
      })
      .catch((err: Error) => {
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('general.GetKYCFail'), err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, {
          key: '',
          value: false
        })
      })
  },

  [ActionTypes.CreateKYC] ({ commit }, payload: CreateKYCRequest) {
    const { t } = useI18n()
    post<CreateKYCRequest, CreateKYCResponse>(API.CREATE_KYC, payload)
      .then((resp: CreateKYCResponse) => {
        commit(KYCMutationTypes.SetKYCInfo, resp.Info)
      })
      .catch((err: Error) => {
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('general.GetKYCFail'), err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, {
          key: '',
          value: false
        })
      })
  },

  [ActionTypes.UpdateKYC] ({ commit }, payload: UpdateKYCRequest) {
    const { t } = useI18n()
    post<UpdateKYCRequest, UpdateKYCResponse>(API.UPDATE_KYC, payload)
      .then((resp: UpdateKYCResponse) => {
        commit(KYCMutationTypes.SetKYCInfo, resp.Info)
      })
      .catch((err: Error) => {
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('general.GetKYCFail'), err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, {
          key: '',
          value: false
        })
      })
  }
}

export { actions, KYCActions }
