import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { UserState } from './state'
import { UserBaiscInfo, UserInfo } from './types'

type UserMutations<S = UserState> = {
  [MutationTypes.SetUserInfo] (state: S, payload: UserInfo): void,
  [MutationTypes.SetUserLogined] (state: UserState, payload: boolean): void,
  [MutationTypes.SetUserBasicInfo] (state: UserState, payload: UserBaiscInfo): void
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
  }
}

export { UserMutations, mutations }
