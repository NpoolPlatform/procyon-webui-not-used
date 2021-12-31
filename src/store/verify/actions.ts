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
import { RequestMessageToNotifyMessage, setLoginVerify } from 'src/utils/utils'
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
    VerifyMutations<VerifyState>>, payload: SendEmailRequest): void

  [ActionTypes.SendSMS] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: SendSmsRequest): void

  [ActionTypes.GetQRCodeURL] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: GetQRCodeURLRequest): void

  [ActionTypes.VerifyCodeWithUserID] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: VerifyCodeWithUserIDRequest): void

  [ActionTypes.VerifyGoogleAuthentication] ({
    commit,
    dispatch
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: VerifyGoogleAuthenticationCodeRequest): void
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
  [ActionTypes.SendEmail] ({ commit }, payload: SendEmailRequest) {
    const { t } = useI18n()
    post<SendEmailRequest, SendEmailResponse>(VerifyURLPath.SEND_EMAIL, payload).then(() => {
      commit(notifyMutation.SetInnerLoading, {
        key: payload.ItemTarget,
        value: false
      })
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SendEmail.Success.Words1') + '<' + payload.Email + '>' + t('notify.SendEmail.Success.Words2') + t('notify.SendEmail.Success.Check'), '', 'positive'))
      countInternal(commit, payload.ItemTarget)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SendEmail.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetInnerLoading, {
        key: payload.ItemTarget,
        value: false
      })
      countInternal(commit, payload.ItemTarget)
    })
  },
  [ActionTypes.SendSMS] ({ commit }, payload: SendSmsRequest) {
    const { t } = useI18n()
    post<SendSmsRequest, SendSmsResponse>(VerifyURLPath.SEND_SMS, payload).then(() => {
      commit(notifyMutation.SetInnerLoading, {
        key: payload.ItemTarget,
        value: false
      })
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SendPhone.Success.Words1') +
        ' <' +
        payload.Phone +
        '>, ' +
        t('notify.SendPhone.Success.Words2') +
        t('notify.SendPhone.Success.Check'), '', 'positive'))
      countInternal(commit, payload.ItemTarget)
    }).catch((err: Error) => {
      commit(notifyMutation.SetInnerLoading, {
        key: payload.ItemTarget,
        value: false
      })
      countInternal(commit, payload.ItemTarget)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SendPhone.Fail'), err.message, 'negative'))
    })
  },
  [ActionTypes.GetQRCodeURL] ({ commit }, payload: GetQRCodeURLRequest) {
    const { t } = useI18n()
    let info: GoogleAuthenticationInfo = {
      qrCodeURL: '',
      secret: ''
    }
    post<GetQRCodeURLRequest, GetQRCodeURLResponse>(VerifyURLPath.GET_QRCODE_URL, payload)
      .then((resp: GetQRCodeURLResponse) => {
        info = {
          qrCodeURL: resp.Info.CodeURL,
          secret: resp.Info.Secret
        }
        commit(MutationTypes.SetGoogleAuthenticationInfo, info)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetGoogleAuthenticationInfo, info)
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.GetQRCodeURL.Fail'), err.message, 'negative'))
      })
  },
  [ActionTypes.VerifyCodeWithUserID] ({ commit }, payload: VerifyCodeWithUserIDRequest) {
    const { t } = useI18n()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload)
    post<VerifyCodeWithUserIDRequest, VerifyCodeWithUserIDResponse>(VerifyURLPath.VERIFY_CODE_WITH_USERID, payload).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.VerifyWithUserID.Success'), '', 'positive'))
      void setLoginVerify()
      commit(userMutation.SetLoginVerify, true)
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      let error = ''
      if (err.message.indexOf('nil')) {
        error = t('verifyCodeFailReason')
      } else {
        error = err.message
      }
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.VerifyWithUserID.Fail'), error, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.VerifyGoogleAuthentication] ({
    commit,
    dispatch
  }, payload: VerifyGoogleAuthenticationCodeRequest) {
    const { t } = useI18n()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, t('notify.VerifyGoogleAuthentication.Load'))
    post<VerifyGoogleAuthenticationCodeRequest, VerifyGoogleAuthenticationCodeResponse>(VerifyURLPath.VERIFY_GOOGLE_AUTHENTICATION, payload).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.VerifyGoogleAuthentication.Success'), '', 'positive'))
      if (payload.Bind) {
        const request: UpdateUserGAStatusRequest = {
          Status: true
        }
        void dispatch(userAction.UpdateUserGAStatus, request)
      }
      commit(userMutation.SetLoginVerify, true)
      void setLoginVerify()
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.VerifyGoogleAuthentication.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  }
}

export { actions, VerifyActions }
