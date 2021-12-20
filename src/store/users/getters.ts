import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { UserBaiscInfo } from './types'

type UserGetters = {
  getUserInfo (state: UserState): UserBaiscInfo
  getUserLogined (state: UserState): boolean
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getUserInfo: (state: UserState): UserBaiscInfo => state.info.UserBasicInfo,
  getUserLogined: (state: UserState): boolean => state.logined
}

export { UserGetters, getters }
