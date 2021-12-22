import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { GoodState } from './state'
import { GoodDetail } from './types'

type GoodGetters = {
  getUserInfo(state: GoodState): Array<GoodDetail>
  getUserError(state: GoodState): string
  getUserLoading(state: GoodState): boolean
}

const getters: GetterTree<GoodState, RootState> & GoodGetters = {
  getUserInfo: (state: GoodState): Array<GoodDetail> => state.goods,
  getUserError: (state: GoodState): string => state.error,
  getUserLoading: (state: GoodState): boolean => state.loading
}

export { GoodGetters, getters }
