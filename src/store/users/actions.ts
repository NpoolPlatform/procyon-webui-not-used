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
  UserSignUpResponse,
  UserForgetPasswordRequest, UserChangePasswordRequest, UserForgetPasswordResponse, UserChangePasswordResponse
} from './types'
import { RequestInput } from 'src/store/types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage, sha256Password } from 'src/utils/utils'
import { useRouter } from 'vue-router'
import { MutationTypes as styleMutation } from 'src/store/style/mutation-types'

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
}

const actions: ActionTree<UserState, RootState> = {
  [ActionTypes.UserLogout] ({ commit }, payload: RequestInput<UserLogoutRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    post<UserLogoutRequest, UserLogoutResponse>(UserURLPath.LOGOUT, payload.requestInput)
      .then(() => {
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
        commit(MutationTypes.SetUserLogined, false)
      })
      .catch((err: Error) => {
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
        commit(notifyMutation.SetLoading, false)
      })
  },
  [ActionTypes.UserLogin] ({ commit }, payload: RequestInput<UserLoginRequest>) {
    commit(notifyMutation.SetLoading, true)
    commit(notifyMutation.SetLoadingContent, payload.loadingContent)
    payload.requestInput.Password = sha256Password(payload.requestInput.Password)
    post<UserLoginRequest, UserLoginResponse>(UserURLPath.LOGIN, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
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
    commit(notifyMutation.SetLoading, true)
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
  }
}

export { actions, UserActions }
