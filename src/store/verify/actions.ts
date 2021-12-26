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
  googleAuthenticationInfo,
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
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<SendEmailRequest, SendEmailResponse>(VerifyURLPath.SEND_EMAIL, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.SendSMS] ({ commit }, payload: RequestInput<SendSmsRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<SendSmsRequest, SendSmsResponse>(VerifyURLPath.SEND_SMS, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.GetQRCodeURL] ({ commit }, payload: RequestInput<GetQRCodeURLRequest>) {
    let info: googleAuthenticationInfo
    commit(notifyMutation.SetInnerLoading, true)
    post<GetQRCodeURLRequest, GetQRCodeURLResponse>(VerifyURLPath.GET_QRCODE_URL, payload.requestInput)
      .then((resp: GetQRCodeURLResponse) => {
        info = {
          qrCodeURL: resp.Info.CodeURL,
          secret: resp.Info.Secret
        }
        commit(MutationTypes.SetGoogleAuthenticationInfo, info)
        commit(notifyMutation.SetInnerLoading, false)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetGoogleAuthenticationInfo, info)
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, false)
      })
  },
  [ActionTypes.VerifyCodeWithUserID] ({ commit }, payload: RequestInput<VerifyCodeWithUserIDRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<VerifyCodeWithUserIDRequest, VerifyCodeWithUserIDResponse>(VerifyURLPath.VERIFY_CODE_WITH_USERID, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
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
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  }
}

export { actions, VerifyActions }
