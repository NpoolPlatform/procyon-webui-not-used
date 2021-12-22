import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { GoodState } from './state'
import { GoodDetail } from './types'

type GoodGetters = {
  getGoodDetails(state: GoodState): Array<GoodDetail>
  getGoodError(state: GoodState): string
  getGoodLoading(state: GoodState): boolean
}

const getters: GetterTree<GoodState, RootState> & GoodGetters = {
  getGoodDetails: (state: GoodState): Array<GoodDetail> => state.goods,
  getGoodError: (state: GoodState): string => state.error,
  getGoodLoading: (state: GoodState): boolean => state.loading
}

export { GoodGetters, getters }
