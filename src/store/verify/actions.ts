import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { VerifyMutations } from './mutations'
import { VerifyState } from './state'
import { post } from 'src/boot/axios'
import {
  SendEmailCodeRequest,
  SendEmailCodeResponse,
  SendSmsRequest,
  SendSmsResponse,
  VerifyGoogleAuthenticationCodeRequest,
  VerifyGoogleAuthenticationCodeResponse,
  VerifyURLPath,
  SendUserSiteContactEmailRequest,
  SendUserSiteContactEmailResponse,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
  SetupGoogleAuthenticationRequest,
  SetupGoogleAuthenticationResponse
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
    VerifyMutations<VerifyState>>, payload: SendEmailCodeRequest): void

  [ActionTypes.SendSMS] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: SendSmsRequest): void

  [ActionTypes.SetupGoogleAuthentication] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: SetupGoogleAuthenticationRequest): void

  [ActionTypes.VerifyEmailCode] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: VerifyEmailCodeRequest): void

  [ActionTypes.VerifyGoogleAuthentication] ({
    commit,
    dispatch
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: VerifyGoogleAuthenticationCodeRequest): void

  [ActionTypes.SendUserSiteContactEmail] ({
    commit
  }: AugmentedActionContext<VerifyState,
    RootState,
    VerifyMutations<VerifyState>>, payload: SendUserSiteContactEmailRequest): void
}

const actions: ActionTree<VerifyState, RootState> = {
  [ActionTypes.SendEmail] ({ commit }, payload: SendEmailCodeRequest) {
    const { t } = useI18n()
    post<SendEmailCodeRequest, SendEmailCodeResponse>(VerifyURLPath.SEND_EMAIL, payload).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SendEmail.Success.Words1') +
        '<' +
        payload.EmailAddress +
        '>, ' +
        t('notify.SendEmail.Success.Words2') +
        t('notify.SendEmail.Success.Check'), '', 'positive'))
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SendEmail.Fail'), err.message, 'negative'))
    })
  },
  [ActionTypes.SendSMS] ({ commit }, payload: SendSmsRequest) {
    const { t } = useI18n()
    post<SendSmsRequest, SendSmsResponse>(VerifyURLPath.SEND_SMS, payload).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SendPhone.Success.Words1') +
        ' <' +
        payload.Phone +
        '>, ' +
        t('notify.SendPhone.Success.Words2') +
        t('notify.SendPhone.Success.Check'), '', 'positive'))
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SendPhone.Fail'), err.message, 'negative'))
    })
  },
  [ActionTypes.SetupGoogleAuthentication] ({ commit }, payload: SetupGoogleAuthenticationRequest) {
    const { t } = useI18n()
    post<SetupGoogleAuthenticationRequest, SetupGoogleAuthenticationResponse>(VerifyURLPath.SETUP_GOOGLE_AUTHENTICATION, payload)
      .then((resp: SetupGoogleAuthenticationResponse) => {
        commit(MutationTypes.SetGoogleAuthenticationInfo, resp)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetGoogleAuthenticationInfo, {})
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.GetQRCodeURL.Fail'), err.message, 'negative'))
      })
  },
  [ActionTypes.VerifyEmailCode] ({ commit }, payload: VerifyEmailCodeRequest) {
    const { t } = useI18n()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload)
    post<VerifyEmailCodeRequest, VerifyEmailCodeResponse>(VerifyURLPath.VERIFY_EMAIL_CODE, payload).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.VerifyWithUserID.Success'), '', 'positive'))
      void setLoginVerify()
      commit(userMutation.SetLoginVerify, true)
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.VerifyWithUserID.Fail'), err.message, 'negative'))
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
  },
  [ActionTypes.SendUserSiteContactEmail] ({
    commit
  }, payload: SendUserSiteContactEmailRequest) {
    const { t } = useI18n()
    commit(notifyMutation.SetLoading, true)
    post<SendUserSiteContactEmailRequest, SendUserSiteContactEmailResponse>(VerifyURLPath.SEND_USER_SITE_CONTACT_EMAIL, payload).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SendUserSiteContactEmail.Success'), '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SendUserSiteContactEmail.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  }
}

export { actions, VerifyActions }
