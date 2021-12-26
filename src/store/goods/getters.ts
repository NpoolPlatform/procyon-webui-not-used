import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { GoodState } from './state'
import { GoodDetail } from './types'

type GoodGetters = {
  getGoodDetails (state: GoodState): Array<GoodDetail>
}

const getters: GetterTree<GoodState, RootState> & GoodGetters = {
  getGoodDetails: (state: GoodState): Array<GoodDetail> => state.goods
}

export { GoodGetters, getters }
