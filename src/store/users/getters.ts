import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { UserBasicInfo, UserInfo } from './types'

type UserGetters = {
  getUserInfo(state: UserState): UserInfo
  getUserLogined(state: UserState): boolean
  getUserInvitationCode(state: UserState): string
  getLoginVerify(state: UserState): boolean
  getUserBasicInfo(state: UserState): UserBasicInfo
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getUserInfo: (state: UserState): UserInfo => state.info,
  getUserLogined: (state: UserState): boolean => state.logined,
  getUserInvitationCode: (state: UserState): string => state.invitationCode,
  getLoginVerify: (state: UserState): boolean => state.loginVerify,
  getUserBasicInfo: (state: UserState): UserBasicInfo => state.info.UserBasicInfo
}

export { UserGetters, getters }
