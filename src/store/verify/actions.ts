import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { VerifyMutations } from './mutations'
import { VerifyState } from './state'
import { post } from 'src/boot/axios'
import * as VerifyTypes from './types'
import { VerifyURLPath } from './types'

// use public api
interface VerifyActions {
  [ActionTypes.SendEmail] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: VerifyTypes.SendEmailRequest): void

  [ActionTypes.SendSMS] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: VerifyTypes.SendSmsRequest): void

  [ActionTypes.GetQRCodeURL] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: VerifyTypes.GetQRCodeURLRequest): void

  [ActionTypes.VerifyCodeWithUserID] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: VerifyTypes.VerifyCodeWithUserIDRequest): void

  [ActionTypes.VerifyGoogleAuthentication] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: VerifyTypes.VerifyGoogleAuthenticationCodeRequest): void
}

const actions: ActionTree<VerifyState, RootState> = {
  [ActionTypes.SendEmail] ({ commit }, payload: VerifyTypes.SendEmailRequest) {
    commit(MutationTypes.SetLoading, true)
    post<VerifyTypes.SendEmailRequest, VerifyTypes.SendEmailResponse>(VerifyURLPath.SEND_EMAIL, payload)
      .then(() => {
        commit(MutationTypes.SetError, '')
        commit(MutationTypes.SetLoading, false)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetError, err)
        commit(MutationTypes.SetLoading, false)
      })
  },
  [ActionTypes.SendSMS] ({ commit }, payload: VerifyTypes.SendSmsRequest) {
    commit(MutationTypes.SetLoading, true)
    post<VerifyTypes.SendSmsRequest, VerifyTypes.SendSmsResponse>(VerifyURLPath.SEND_SMS, payload)
      .then(() => {
        commit(MutationTypes.SetError, '')
        commit(MutationTypes.SetLoading, false)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetError, err)
        commit(MutationTypes.SetLoading, false)
      })
  },
  [ActionTypes.GetQRCodeURL] ({ commit }, payload: VerifyTypes.GetQRCodeURLRequest) {
    commit(MutationTypes.SetLoading, true)
    post<VerifyTypes.GetQRCodeURLRequest, VerifyTypes.GetQRCodeURLResponse>(VerifyURLPath.GET_QRCODE_URL, payload)
      .then((resp: VerifyTypes.GetQRCodeURLResponse) => {
        commit(MutationTypes.SetGoogleAuthenticationInfo, {
          secret: resp.Info.Secret,
          qrcodeURL: resp.Info.CodeURL
        })
        commit(MutationTypes.SetError, '')
        commit(MutationTypes.SetLoading, false)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetError, err)
        commit(MutationTypes.SetLoading, false)
      })
  },
  [ActionTypes.VerifyCodeWithUserID] ({ commit }, payload: VerifyTypes.VerifyCodeWithUserIDRequest) {
    commit(MutationTypes.SetLoading, true)
    post<VerifyTypes.VerifyCodeWithUserIDRequest, VerifyTypes.VerifyCodeWithUserIDResponse>(VerifyURLPath.VERIFY_CODE_WITH_USERID, payload)
      .then(() => {
        commit(MutationTypes.SetError, '')
        commit(MutationTypes.SetLoading, false)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetError, err)
        commit(MutationTypes.SetLoading, false)
      })
  },
  [ActionTypes.VerifyGoogleAuthentication] ({ commit }, payload: VerifyTypes.VerifyGoogleAuthenticationCodeRequest) {
    commit(MutationTypes.SetLoading, true)
    post<VerifyTypes.VerifyGoogleAuthenticationCodeRequest, VerifyTypes.VerifyGoogleAuthenticationCodeResponse>(VerifyURLPath.VERIFY_GOOGLE_AUTHENTICATION, payload)
      .then(() => {
        commit(MutationTypes.SetError, '')
        commit(MutationTypes.SetLoading, false)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetError, err)
        commit(MutationTypes.SetLoading, false)
      })
  }
}

export { actions, VerifyActions }
