import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { UserState } from './state'
import { UserBaiscInfo, UserInfo } from './types'

type UserMutations<S = UserState> = {
  [MutationTypes.SetUserInfo](state: S, payload: UserInfo): void
  [MutationTypes.SetUserLogined](state: S, payload: boolean): void
  [MutationTypes.SetUserBasicInfo](state: S, payload: UserBaiscInfo): void
  [MutationTypes.SetError](state: S, payload: string): void
  [MutationTypes.SetLoading](state: S, payload: boolean): void
  [MutationTypes.SetHasInvitationCode](state: S, payload: boolean): void
}

const mutations: MutationTree<UserState> & UserMutations = {
  [MutationTypes.SetUserInfo] (state: UserState, payload: UserInfo) {
    state.info = payload
  },
  [MutationTypes.SetUserLogined] (state: UserState, payload: boolean) {
    state.logined = payload
  },
  [MutationTypes.SetUserBasicInfo] (state: UserState, payload: UserBaiscInfo) {
    state.info.UserBasicInfo = payload
  },
  [MutationTypes.SetError] (state: UserState, payload: string) {
    state.error = payload
  },
  [MutationTypes.SetLoading] (state: UserState, payload: boolean) {
    state.loading = payload
  },
  [MutationTypes.SetHasInvitationCode] (state: UserState, payload: boolean) {
    state.hasInvitationCode = payload
  }
}

export { UserMutations, mutations }
