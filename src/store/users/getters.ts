import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { LoginRecord, UserInfo } from './types'

type UserGetters = {
  getUserInfo(state: UserState): UserInfo
  getUserLogined(state: UserState): boolean
  getUserInvitationCode(state: UserState): string
  getLoginVerify(state: UserState): boolean
  getUserLoginHistory(state: UserState): Array<LoginRecord>
  getUserLoadGoogleRecaptcha(state: UserState): boolean
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getUserInfo: (state: UserState): UserInfo => state.info,
  getUserLogined: (state: UserState): boolean => state.logined,
  getUserInvitationCode: (state: UserState): string => state.invitationCode,
  getLoginVerify: (state: UserState): boolean => state.loginVerify,
  getUserLoginHistory: (state: UserState): Array<LoginRecord> => state.loginHistory,
  getUserLoadGoogleRecaptcha: (state: UserState): boolean => state.loadGoogleRecaptcha
}

export { UserGetters, getters }
