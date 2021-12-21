import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { UserBaiscInfo } from './types'

type UserGetters = {
  getUserInfo(state: UserState): UserBaiscInfo
  getUserLogined(state: UserState): boolean
  getUserHasInvitationCode(state: UserState): boolean
  getUserError(state: UserState): string
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getUserInfo: (state: UserState): UserBaiscInfo => state.info.UserBasicInfo,
  getUserLogined: (state: UserState): boolean => state.logined,
  getUserHasInvitationCode: (state: UserState): boolean =>
    state.hasInvitationCode,
  getUserError: (state: UserState): string => state.error
}

export { UserGetters, getters }
