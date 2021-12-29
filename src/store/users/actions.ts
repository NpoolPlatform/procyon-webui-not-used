import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { UserMutations } from './mutations'
import { UserState } from './state'
import { post } from 'src/boot/axios'
import {
  UserLoginRequest,
  UserLoginResponse,
  UserURLPath,
  UserLogoutRequest,
  UserLogoutResponse,
  GetUserInvitationCodeRequest,
  GetUserInvitationCodeResponse,
  UserSignUpRequest,
  UserForgetPasswordRequest,
  UserChangePasswordRequest,
  UserForgetPasswordResponse,
  UserChangePasswordResponse,
  GetUserDetailRequest,
  GetUserDetailResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  GetUserLoginHistoryRequest,
  GetUserLoginHistoryResponse,
  SetGALoginVerifyRequest,
  SetGaLoginVerifyResponse,
  UpdateUserGAStatusRequest,
  UpdateUserGAStatusResponse,
  UpdatePhoneRequest,
  UpdatePhoneResponse,
  UpdateEmailResponse,
  UpdateEmailRequest,
  EnablePhoneRequest, EnablePhoneResponse, EnableEmailRequest, EnableEmailResponse, UserSignUpResponse
} from './types'
import { RequestInput } from 'src/store/types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage } from 'src/utils/utils'
import { MutationTypes as styleMutation } from 'src/store/style/mutation-types'
import { useRouter } from 'src/router/index'

// use public api
interface UserActions {
  [ActionTypes.UserLogout] (
    {
      commit
    }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<UserLogoutRequest>
  ): void

  [ActionTypes.UserLogin] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<UserLoginRequest>): void

  [ActionTypes.GetUserInvitationCode] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<GetUserInvitationCodeRequest>): void

  [ActionTypes.UserSignUp] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<UserSignUpRequest>): void

  [ActionTypes.UserForgetPassword] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<UserForgetPasswordRequest>): void

  [ActionTypes.UserChangePassword] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<UserChangePasswordRequest>): void

  [ActionTypes.GetUserDetail] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<GetUserDetailRequest>): void

  [ActionTypes.UpdateUser] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<UpdateUserRequest>): void

  [ActionTypes.GetUserLoginHistory] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<GetUserLoginHistoryRequest>): void

  [ActionTypes.SetGALoginVerify] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<SetGALoginVerifyRequest>): void

  [ActionTypes.UpdateUserGAStatus] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<UpdateUserGAStatusRequest>): void

  [ActionTypes.EnableEmail] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<EnableEmailRequest>): void

  [ActionTypes.EnablePhone] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<EnablePhoneRequest>): void

  [ActionTypes.UpdateEmail] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<UpdateEmailRequest>): void

  [ActionTypes.UpdatePhone] ({
    commit
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: RequestInput<UpdatePhoneRequest>): void
}

const actions: ActionTree<UserState, RootState> = {
  [ActionTypes.UserLogout] ({ commit }, payload: RequestInput<UserLogoutRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<UserLogoutRequest, UserLogoutResponse>(UserURLPath.LOGOUT, payload.requestInput)
      .then(() => {
        commit(MutationTypes.SetLoginVerify, false)
        commit(MutationTypes.SetUserLogined, false)
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
        commit(notifyMutation.SetLoading, false)
      })
      .catch((err: Error) => {
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
        commit(notifyMutation.SetLoading, false)
      })
  },
  [ActionTypes.UserLogin] ({ commit }, payload: RequestInput<UserLoginRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<UserLoginRequest, UserLoginResponse>(UserURLPath.LOGIN, payload.requestInput).then((resp: UserLoginResponse) => {
      commit(MutationTypes.SetUserInfo, resp.Info)
      commit(MutationTypes.SetUserLogined, true)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(MutationTypes.SetUserLogined, false)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.GetUserInvitationCode] ({ commit }, payload: RequestInput<GetUserInvitationCodeRequest>) {
    commit(notifyMutation.SetInnerLoading, true)
    post<GetUserInvitationCodeRequest, GetUserInvitationCodeResponse>(UserURLPath.GET_USER_INVITATION_CODE, payload.requestInput).then((resp: GetUserInvitationCodeResponse) => {
      if (resp.Info !== null) {
        commit(MutationTypes.SetInvitationCode, resp.Info.InvitationCode)
      }
      commit(notifyMutation.SetInnerLoading, false)
    }).catch((err: Error) => {
      commit(MutationTypes.SetInvitationCode, '')
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetInnerLoading, false)
    })
  },
  [ActionTypes.UserSignUp] ({ commit }, payload: RequestInput<UserSignUpRequest>) {
    const router = useRouter()
    commit(notifyMutation.SetLoading, false)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<UserSignUpRequest, UserSignUpResponse>(UserURLPath.SIGN_UP, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      void router.push('/login')
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.UserChangePassword] ({ commit }, payload: RequestInput<UserChangePasswordRequest>) {
    const router = useRouter()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<UserChangePasswordRequest, UserChangePasswordResponse>(UserURLPath.CHANGE_PASSWORD, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      commit(styleMutation.SetUserDialogShow, false)
      void router.push('/account')
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.UserForgetPassword] ({ commit }, payload: RequestInput<UserForgetPasswordRequest>) {
    const router = useRouter()
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<UserForgetPasswordRequest, UserForgetPasswordResponse>(UserURLPath.FORGET_PASSWORD, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      void router.push('/login')
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.GetUserDetail] ({ commit }, payload: RequestInput<GetUserDetailRequest>) {
    post<GetUserDetailRequest, GetUserDetailResponse>(UserURLPath.GET_USER_DETAIL, payload.requestInput).then((resp: GetUserDetailResponse) => {
      commit(MutationTypes.SetUserInfo, resp.Info)
      commit(MutationTypes.SetLoginVerify, true)
      commit(MutationTypes.SetUserLogined, true)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.UpdateUser] ({ commit }, payload: RequestInput<UpdateUserRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<UpdateUserRequest, UpdateUserResponse>(UserURLPath.UPDATE_USER, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.GetUserLoginHistory] ({ commit }, payload: RequestInput<GetUserLoginHistoryRequest>) {
    post<GetUserLoginHistoryRequest, GetUserLoginHistoryResponse>(UserURLPath.GET_USER_LOGIN_HISTORY, payload.requestInput).then((resp: GetUserLoginHistoryResponse) => {
      commit(MutationTypes.SetLoginHistory, resp.Infos)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
    })
  },
  [ActionTypes.SetGALoginVerify] ({ commit }, payload: RequestInput<SetGALoginVerifyRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<SetGALoginVerifyRequest, SetGaLoginVerifyResponse>(UserURLPath.SET_GA_LOGIN_VERIFY, payload.requestInput).then(() => {
      commit(MutationTypes.SetGoogleLoginVerify, payload.requestInput.Set)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.UpdateUserGAStatus] ({ commit }, payload: RequestInput<UpdateUserGAStatusRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(styleMutation.SetUserDialogShow, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<UpdateUserGAStatusRequest, UpdateUserGAStatusResponse>(UserURLPath.UPDATE_USER_GA_STATUS, payload.requestInput).then(() => {
      commit(MutationTypes.SetGoogleAuthenticator, payload.requestInput.Status)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      commit(styleMutation.SetUserDialogShow, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.EnableEmail] ({ commit }, payload: RequestInput<EnableEmailRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(styleMutation.SetUserDialogShow, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<EnableEmailRequest, EnableEmailResponse>(UserURLPath.ENABLE_EMAIL, payload.requestInput).then(() => {
      commit(MutationTypes.SetEmailAddress, payload.requestInput.EmailAddress)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      commit(styleMutation.SetUserDialogShow, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.EnablePhone] ({ commit }, payload: RequestInput<EnablePhoneRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(styleMutation.SetUserDialogShow, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<EnablePhoneRequest, EnablePhoneResponse>(UserURLPath.ENABLE_PHONE, payload.requestInput).then(() => {
      commit(MutationTypes.SetPhoneNumber, payload.requestInput.PhoneNumber)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      commit(styleMutation.SetUserDialogShow, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.UpdateEmail] ({ commit }, payload: RequestInput<UpdateEmailRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(styleMutation.SetUserDialogShow, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<UpdateEmailRequest, UpdateEmailResponse>(UserURLPath.UPDATE_EMAIL, payload.requestInput).then(() => {
      commit(MutationTypes.SetEmailAddress, payload.requestInput.NewEmail)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      commit(styleMutation.SetUserDialogShow, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.UpdatePhone] ({ commit }, payload: RequestInput<UpdatePhoneRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(styleMutation.SetUserDialogShow, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<UpdatePhoneRequest, UpdatePhoneResponse>(UserURLPath.UPDATE_PHONE, payload.requestInput).then(() => {
      commit(MutationTypes.SetPhoneNumber, payload.requestInput.NewPhone)
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
      commit(styleMutation.SetUserDialogShow, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  }
}

export { actions, UserActions }
