import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { UserMutations } from './mutations'
import { UserState } from './state'
import { api, post } from 'src/boot/axios'
import {
  UserLoginRequest,
  UserLoginResponse,
  UserURLPath,
  UserLogoutRequest,
  UserLogoutResponse,
  GetUserInvitationCodeRequest,
  GetUserInvitationCodeResponse,
  UserSignUpRequest,
  GetUserLoginHistoryRequest,
  GetUserLoginHistoryResponse,
  SetGALoginVerifyRequest,
  SetGaLoginVerifyResponse,
  UpdatePhoneRequest,
  UpdatePhoneResponse,
  UpdateEmailResponse,
  UpdateEmailRequest,
  UserSignUpResponse,
  GetAppUserInfoRequest,
  GetAppUserInfoResponse,
  UserUpdatePasswordRequest,
  UserUpdatePasswordResponse,
  UserUpdatePasswordByAppUserRequest,
  UserUpdatePasswordByAppUserResponse,
  UpdateUserExtraRequest,
  UpdateUserExtraResponse,
  CreateUserExtraRequest,
  CreateUserExtraResponse
} from './types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { loginVeiryConfirm, RequestMessageToNotifyMessage } from 'src/utils/utils'
import { MutationTypes as styleMutation } from 'src/store/style/mutation-types'
import { useRouter } from 'src/router/index'
import { useI18n } from 'boot/i18n'
import { Cookies } from 'quasar'

// use public api
interface UserActions {
  [ActionTypes.UserLogout] (
    {
      commit
    }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: UserLogoutRequest
  ): void

  [ActionTypes.UserLogin] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: UserLoginRequest): void

  [ActionTypes.GetUserInvitationCode] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: GetUserInvitationCodeRequest): void

  [ActionTypes.UserSignUp] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: UserSignUpRequest): void

  [ActionTypes.UserForgetPassword] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: UserUpdatePasswordRequest): void

  [ActionTypes.UserChangePassword] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: UserUpdatePasswordByAppUserRequest): void

  [ActionTypes.GetAppUserInfo] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: GetAppUserInfoRequest): void

  [ActionTypes.UpdateUserExtra] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: UpdateUserExtraRequest): void

  [ActionTypes.CreateUserExtra] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: CreateUserExtraRequest): void

  [ActionTypes.GetUserLoginHistory] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: GetUserLoginHistoryRequest): void

  [ActionTypes.SetGALoginVerify] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: SetGALoginVerifyRequest): void

  [ActionTypes.UpdateEmail] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: UpdateEmailRequest): void

  [ActionTypes.UpdatePhone] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: UpdatePhoneRequest): void
}

const actions: ActionTree<UserState, RootState> = {
  [ActionTypes.UserLogout] ({ commit }, payload: UserLogoutRequest) {
    const { t } = useI18n()
    const router = useRouter()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, t('notify.Logout.Load'))
    post<UserLogoutRequest, UserLogoutResponse>(UserURLPath.LOGOUT, payload)
      .then(() => {
        commit(MutationTypes.SetLoginVerify, false)
        commit(MutationTypes.SetUserLogined, false)
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Logout.Success'), '', 'positive'))
        commit(notifyMutation.SetLoading, false)
        commit(MutationTypes.ClearUserInfo)
        Cookies.remove(loginVeiryConfirm)
        void router.push('/')
      })
      .catch((err: Error) => {
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Logout.Fail'), err.message, 'negative'))
        commit(notifyMutation.SetLoading, false)
      })
  },
  [ActionTypes.UserLogin] ({ commit }, payload: UserLoginRequest) {
    commit(MutationTypes.SetLoadGoogleRecaptcha, false)
    const { t } = useI18n()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, t('notify.Login.Load'))
    post<UserLoginRequest, UserLoginResponse>(UserURLPath.LOGIN, payload).then((resp: UserLoginResponse) => {
      const headers = api.defaults.headers as Record<string, string>
      headers['X-User-ID'] = resp.Info.User?.ID as string
      headers['X-App-Login-Token'] = resp.Token
      commit(MutationTypes.SetUserInfo, resp.Info)
      commit(MutationTypes.SetUserLogined, true)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Login.Success'), '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(MutationTypes.SetUserLogined, false)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Login.Fail'), err.message, 'negative'))
      commit(MutationTypes.SetLoadGoogleRecaptcha, true)
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.GetUserInvitationCode] ({ commit }, payload: GetUserInvitationCodeRequest) {
    const { t } = useI18n()
    post<GetUserInvitationCodeRequest, GetUserInvitationCodeResponse>(UserURLPath.GET_USER_INVITATION_CODE, payload).then((resp: GetUserInvitationCodeResponse) => {
      if (resp.Info !== null) {
        commit(MutationTypes.SetInvitationCode, resp.Info.InvitationCode)
      }
    }).catch((err: Error) => {
      commit(MutationTypes.SetInvitationCode, '')
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.GetUserInvitationCode.Fail'), err.message, 'negative'))
    })
  },
  [ActionTypes.UserSignUp] ({ commit }, payload: UserSignUpRequest) {
    const { t } = useI18n()
    const router = useRouter()
    commit(notifyMutation.SetLoading, false)
    commit(notifyMutation.SetLoadingContent, t('notify.Signup.Load'))
    post<UserSignUpRequest, UserSignUpResponse>(UserURLPath.SIGN_UP, payload).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Signup.Success'), '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      void router.push('/login')
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Signup.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.UserChangePassword] ({ commit }, payload: UserUpdatePasswordByAppUserRequest) {
    const { t } = useI18n()
    const router = useRouter()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, t('notify.ChangePassword.Load'))
    post<UserUpdatePasswordByAppUserRequest, UserUpdatePasswordByAppUserResponse>(UserURLPath.UPDATE_PASSWORD_BY_APP_USER, payload).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.ChangePassword.Success'), '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      commit(styleMutation.SetUserDialogShow, false)
      void router.push('/dashboard')
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.ChangePassword.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.UserForgetPassword] ({ commit }, payload: UserUpdatePasswordRequest) {
    const { t } = useI18n()
    const router = useRouter()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, t('notify.Forget.Load'))
    post<UserUpdatePasswordRequest, UserUpdatePasswordResponse>(UserURLPath.UPDATE_PASSWORD, payload).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Forget.Success'), '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      void router.push('/login')
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Forget.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.GetAppUserInfo] ({ commit }, payload: GetAppUserInfoRequest) {
    const { t } = useI18n()
    post<GetAppUserInfoRequest, GetAppUserInfoResponse>(UserURLPath.GET_APP_USER_INFO, payload).then((resp: GetAppUserInfoResponse) => {
      commit(MutationTypes.SetUserInfo, resp.Info)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.GetUserDetail.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.UpdateUserExtra] ({ commit }, payload: UpdateUserExtraRequest) {
    const { t } = useI18n()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, t('notify.Update.Load'))
    post<UpdateUserExtraRequest, UpdateUserExtraResponse>(UserURLPath.UPDATE_APP_USER_EXTRA, payload).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Update.Success'), '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Update.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.CreateUserExtra] ({ commit }, payload: CreateUserExtraRequest) {
    const { t } = useI18n()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, t('notify.Update.Load'))
    post<CreateUserExtraRequest, CreateUserExtraResponse>(UserURLPath.CREATE_APP_USER_EXTRA, payload).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Update.Success'), '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.Update.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.GetUserLoginHistory] ({ commit }, payload: GetUserLoginHistoryRequest) {
    const { t } = useI18n()
    post<GetUserLoginHistoryRequest, GetUserLoginHistoryResponse>(UserURLPath.GET_USER_LOGIN_HISTORY, payload).then((resp: GetUserLoginHistoryResponse) => {
      commit(MutationTypes.SetLoginHistory, resp.Infos)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.GetUserLoginHistory.Fail'), err.message, 'negative'))
    })
  },
  [ActionTypes.SetGALoginVerify] ({ commit }, payload: SetGALoginVerifyRequest) {
    const { t } = useI18n()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, t('notify.SetLoginVerify.Load'))
    post<SetGALoginVerifyRequest, SetGaLoginVerifyResponse>(UserURLPath.UPDATE_APP_USER_CONTROL, payload).then(() => {
      commit(MutationTypes.SetGoogleLoginVerify, payload.Info.SigninVerifyByGoogleAuthentication)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SetLoginVerify.Success'), '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.SetLoginVerify.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.UpdateEmail] ({ commit }, payload: UpdateEmailRequest) {
    const { t } = useI18n()
    commit(notifyMutation.SetLoading, true)
    commit(styleMutation.SetUserDialogShow, true)
    commit(notifyMutation.SetLoadingContent, t('notify.UpdateEmail.Load'))
    post<UpdateEmailRequest, UpdateEmailResponse>(UserURLPath.UPDATE_EMAIL, payload).then(() => {
      commit(MutationTypes.SetEmailAddress, payload.NewEmailAddress)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.UpdateEmail.Success'), '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      commit(styleMutation.SetUserDialogShow, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.UpdateEmail.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.UpdatePhone] ({ commit }, payload: UpdatePhoneRequest) {
    const { t } = useI18n()
    commit(notifyMutation.SetLoading, true)
    commit(styleMutation.SetUserDialogShow, true)
    commit(notifyMutation.SetLoadingContent, t('notify.UpdatePhone.Load'))
    post<UpdatePhoneRequest, UpdatePhoneResponse>(UserURLPath.UPDATE_PHONE, payload).then(() => {
      commit(MutationTypes.SetPhoneNumber, payload.NewPhoneNO)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.UpdatePhone.Success'), '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      commit(styleMutation.SetUserDialogShow, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.UpdatePhone.Fail'), err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  }
}

export { actions, UserActions }
