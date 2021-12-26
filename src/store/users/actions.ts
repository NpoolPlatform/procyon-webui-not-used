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
  GetUserInvitationCodeRequest, GetUserInvitationCodeResponse
} from './types'
import { RequestInput } from 'src/store/types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage } from 'src/utils/utils'

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
  }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>, payload: GetUserInvitationCodeRequest): void
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
    post<UserLoginRequest, UserLoginResponse>(UserURLPath.LOGIN, payload.requestInput).then(() => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.successMessage, '', 'positive'))
      commit(notifyMutation.SetLoading, false)
    }).catch((err: Error) => {
      commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
      commit(notifyMutation.SetLoading, false)
    })
  },
  [ActionTypes.GetUserInvitationCode] ({ commit }, payload: GetUserInvitationCodeRequest) {
    post<GetUserInvitationCodeRequest, GetUserInvitationCodeResponse>(UserURLPath.GET_USER_INVITATION_CODE, payload).then((resp: GetUserInvitationCodeResponse) => {
      if (resp.Info !== null) {
        commit(MutationTypes.SetInvitationCode, resp.Info.InvitationCode)
      }
    }).catch(() => {
      commit(MutationTypes.SetInvitationCode, '')
    })
  }
}

export { actions, UserActions }
