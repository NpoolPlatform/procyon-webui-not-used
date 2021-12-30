import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { VerifyMutations } from './mutations'
import { VerifyState } from './state'
import { post } from 'src/boot/axios'
import {
  GetQRCodeURLRequest,
  GetQRCodeURLResponse,
  GoogleAuthenticationInfo,
  SendEmailRequest,
  SendEmailResponse,
  SendSmsRequest,
  SendSmsResponse,
  VerifyCodeWithUserIDRequest,
  VerifyCodeWithUserIDResponse,
  VerifyGoogleAuthenticationCodeRequest,
  VerifyGoogleAuthenticationCodeResponse,
  VerifyURLPath
} from './types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestInput } from 'src/store/types'
import { RequestMessageToNotifyMessage } from 'src/utils/utils'
import { MutationTypes as userMutation } from 'src/store/users/mutation-types'

// use public api
interface VerifyActions {
  [ActionTypes.SendEmail] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: RequestInput<SendEmailRequest>): void

  [ActionTypes.SendSMS] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: RequestInput<SendSmsRequest>): void

  [ActionTypes.GetQRCodeURL] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: RequestInput<GetQRCodeURLRequest>): void

  [ActionTypes.VerifyCodeWithUserID] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: RequestInput<VerifyCodeWithUserIDRequest>): void

  [ActionTypes.VerifyGoogleAuthentication] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: RequestInput<VerifyGoogleAuthenticationCodeRequest>): void
}

const actions: ActionTree<VerifyState, RootState> = {
  [ActionTypes.SendEmail] ({ commit }, payload: RequestInput<SendEmailRequest>) {
    let count = 60
    post<SendEmailRequest, SendEmailResponse>(VerifyURLPath.SEND_EMAIL, payload.requestInput).then(() => {
      commit(notifyMutation.SetInnerLoading, {
        key: payload.requestInput.ItemTarget,
        value: false
      })
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      const countDown = setInterval(() => {
        if (count < 1) {
          commit(MutationTypes.SetDisable, {
            key: payload.requestInput.ItemTarget,
            value: false
          })
          count = 60
          clearInterval(countDown)
        } else {
          commit(MutationTypes.SetDisable, {
            key: payload.requestInput.ItemTarget,
            value: true
          })
          commit(MutationTypes.SetSendCodeButtonText, {
            key: payload.requestInput.ItemTarget,
            value: count.toString() + 's'
          })
          count--
        }
      }, 1000)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetInnerLoading, {
        key: payload.requestInput.ItemTarget,
        value: false
      })
      const countDown = setInterval(() => {
        if (count < 1) {
          commit(MutationTypes.SetDisable, {
            key: payload.requestInput.ItemTarget,
            value: false
          })
          count = 60
          clearInterval(countDown)
        } else {
          commit(MutationTypes.SetDisable, {
            key: payload.requestInput.ItemTarget,
            value: true
          })
          commit(MutationTypes.SetSendCodeButtonText, {
            key: payload.requestInput.ItemTarget,
            value: count.toString() + 's'
          })
          count--
        }
      }, 1000)
    })
  },
  [ActionTypes.SendSMS] ({ commit }, payload: RequestInput<SendSmsRequest>) {
    let count = 60
    post<SendSmsRequest, SendSmsResponse>(VerifyURLPath.SEND_SMS, payload.requestInput).then(() => {
      commit(notifyMutation.SetInnerLoading, {
        key: payload.requestInput.ItemTarget,
        value: false
      })
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      const countDown = setInterval(() => {
        if (count < 1) {
          commit(MutationTypes.SetDisable, {
            key: payload.requestInput.ItemTarget,
            value: false
          })
          count = 60
          clearInterval(countDown)
        } else {
          commit(MutationTypes.SetDisable, {
            key: payload.requestInput.ItemTarget,
            value: true
          })
          commit(MutationTypes.SetSendCodeButtonText, {
            key: payload.requestInput.ItemTarget,
            value: count.toString() + 's'
          })
          count--
        }
      }, 1000)
    }).catch((err: Error) => {
      commit(notifyMutation.SetInnerLoading, {
        key: payload.requestInput.ItemTarget,
        value: false
      })
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      const countDown = setInterval(() => {
        if (count < 1) {
          commit(MutationTypes.SetDisable, {
            key: payload.requestInput.ItemTarget,
            value: false
          })
          count = 60
          clearInterval(countDown)
        } else {
          commit(MutationTypes.SetDisable, {
            key: payload.requestInput.ItemTarget,
            value: true
          })
          commit(MutationTypes.SetSendCodeButtonText, {
            key: payload.requestInput.ItemTarget,
            value: count.toString() + 's'
          })
          count--
        }
      }, 1000)
    })
  },
  [ActionTypes.GetQRCodeURL] ({ commit }, payload: RequestInput<GetQRCodeURLRequest>) {
    let info: GoogleAuthenticationInfo = {
      qrCodeURL: '',
      secret: ''
    }
    post<GetQRCodeURLRequest, GetQRCodeURLResponse>(VerifyURLPath.GET_QRCODE_URL, payload.requestInput)
      .then((resp: GetQRCodeURLResponse) => {
        info = {
          qrCodeURL: resp.Info.CodeURL,
          secret: resp.Info.Secret
        }
        commit(MutationTypes.SetGoogleAuthenticationInfo, info)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetGoogleAuthenticationInfo, info)
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      })
  },
  [ActionTypes.VerifyCodeWithUserID] ({ commit }, payload: RequestInput<VerifyCodeWithUserIDRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<VerifyCodeWithUserIDRequest, VerifyCodeWithUserIDResponse>(VerifyURLPath.VERIFY_CODE_WITH_USERID, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(userMutation.SetLoginVerify, true)
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.VerifyGoogleAuthentication] ({ commit }, payload: RequestInput<VerifyGoogleAuthenticationCodeRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<VerifyGoogleAuthenticationCodeRequest, VerifyGoogleAuthenticationCodeResponse>(VerifyURLPath.VERIFY_GOOGLE_AUTHENTICATION, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(userMutation.SetLoginVerify, true)
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  }
}

export { actions, VerifyActions }
