import { ActionTree, Commit } from 'vuex'
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
import { ActionTypes as userAction } from 'src/store/users/action-types'
import { UpdateUserGAStatusRequest } from 'src/store/users/types'
import { useI18n } from 'src/boot/i18n'

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
    commit,
    dispatch
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: RequestInput<VerifyGoogleAuthenticationCodeRequest>): void
}

const countInternal = (commit: Commit, target: string) => {
  let count = 60
  const countDown = setInterval(() => {
    if (count < 1) {
      commit(MutationTypes.SetDisable, {
        key: target,
        value: false
      })
      count = 60
      clearInterval(countDown)
    } else {
      commit(MutationTypes.SetDisable, {
        key: target,
        value: true
      })
      commit(MutationTypes.SetSendCodeButtonText, {
        key: target,
        value: count.toString() + 's'
      })
      count--
    }
  }, 1000)
}

const actions: ActionTree<VerifyState, RootState> = {
  [ActionTypes.SendEmail] ({ commit }, payload: RequestInput<SendEmailRequest>) {
    post<SendEmailRequest, SendEmailResponse>(VerifyURLPath.SEND_EMAIL, payload.requestInput).then(() => {
      commit(notifyMutation.SetInnerLoading, {
        key: payload.requestInput.ItemTarget,
        value: false
      })
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      countInternal(commit, payload.requestInput.ItemTarget)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetInnerLoading, {
        key: payload.requestInput.ItemTarget,
        value: false
      })
      countInternal(commit, payload.requestInput.ItemTarget)
    })
  },
  [ActionTypes.SendSMS] ({ commit }, payload: RequestInput<SendSmsRequest>) {
    post<SendSmsRequest, SendSmsResponse>(VerifyURLPath.SEND_SMS, payload.requestInput).then(() => {
      commit(notifyMutation.SetInnerLoading, {
        key: payload.requestInput.ItemTarget,
        value: false
      })
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      countInternal(commit, payload.requestInput.ItemTarget)
    }).catch((err: Error) => {
      commit(notifyMutation.SetInnerLoading, {
        key: payload.requestInput.ItemTarget,
        value: false
      })
      countInternal(commit, payload.requestInput.ItemTarget)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
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
  [ActionTypes.VerifyGoogleAuthentication] ({
    commit,
    dispatch
  }, payload: RequestInput<VerifyGoogleAuthenticationCodeRequest>) {
    const { t } = useI18n()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<VerifyGoogleAuthenticationCodeRequest, VerifyGoogleAuthenticationCodeResponse>(VerifyURLPath.VERIFY_GOOGLE_AUTHENTICATION, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      if (payload.requestInput.Bind) {
        const request: UpdateUserGAStatusRequest = {
          Status: true
        }
        const updateUserGAStatueRequest: RequestInput<UpdateUserGAStatusRequest> = {
          requestInput: request,
          messages: {
            successMessage: t('notify.UpdateGoogleStatus.Success'),
            failMessage: t('notify.UpdateGoogleStatus.Fail')
          },
          loadingContent: ''
        }
        void dispatch(userAction.UpdateUserGAStatus, updateUserGAStatueRequest)
      } else {
        commit(userMutation.SetLoginVerify, true)
      }
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  }
}

export { actions, VerifyActions }
