import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { UserState } from './state'
import { UserBasicInfo, UserInfo } from './types'

type UserMutations<S = UserState> = {
  [MutationTypes.SetUserInfo](state: S, payload: UserInfo): void
  [MutationTypes.SetUserLogined](state: S, payload: boolean): void
  [MutationTypes.SetUserBasicInfo](state: S, payload: UserBasicInfo): void
  [MutationTypes.SetError](state: S, payload: string): void
  [MutationTypes.SetLoading](state: S, payload: boolean): void
  [MutationTypes.SetInvitationCode](state: S, payload: string): void
  [MutationTypes.SetLoginVerify](state: S, payload: boolean): void
}

const mutations: MutationTree<UserState> & UserMutations = {
  [MutationTypes.SetUserInfo] (state: UserState, payload: UserInfo) {
    state.info = payload
  },
  [MutationTypes.SetUserLogined] (state: UserState, payload: boolean) {
    state.logined = payload
  },
  [MutationTypes.SetUserBasicInfo] (state: UserState, payload: UserBasicInfo) {
    state.info.UserBasicInfo = payload
  },
  [MutationTypes.SetError] (state: UserState, payload: string) {
    state.error = payload
  },
  [MutationTypes.SetLoading] (state: UserState, payload: boolean) {
    state.loading = payload
  },
  [MutationTypes.SetInvitationCode] (state: UserState, payload: string) {
    state.invitationCode = payload
  },
  [MutationTypes.SetLoginVerify] (state: UserState, payload: boolean) {
    state.loginVerify = payload
  }
}

export { UserMutations, mutations }
