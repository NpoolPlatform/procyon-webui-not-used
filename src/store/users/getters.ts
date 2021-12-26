import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { UserInfo } from './types'

type UserGetters = {
  getUserInfo(state: UserState): UserInfo
  getUserLogined(state: UserState): boolean
  getUserInvitationCode(state: UserState): string
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getUserInfo: (state: UserState): UserInfo => state.info,
  getUserLogined: (state: UserState): boolean => state.logined,
  getUserInvitationCode: (state: UserState): string => state.invitationCode
}

export { UserGetters, getters }
