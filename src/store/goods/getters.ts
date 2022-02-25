import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { GoodState } from './state'
import { Good, Promotion, RecommendGood } from './types'

type GoodGetters = {
  getGoods (state: GoodState): Array<Good>
  getRecommends (state: GoodState): Array<RecommendGood>
  getPromotions (state: GoodState): Array<Promotion>
  getGoodByID (state: GoodState): (goodID: string) => Good | undefined
}

const getters: GetterTree<GoodState, RootState> & GoodGetters = {
  getGoods: (state: GoodState): Array<Good> => state.goods,
  getRecommends: (state: GoodState): Array<RecommendGood> => state.recommends,
  getPromotions: (state: GoodState): Array<Promotion> => state.promotions,
  getGoodByID: (state: GoodState): (goodID: string) => Good | undefined => {
    return (goodID: string) => {
      for (let i = 0; i < state.goods.length; i++) {
        if (goodID === state.goods[i].Good.Good.ID) {
          return state.goods[i]
        }
      }
      return undefined
    }
  }
}

export { GoodGetters, getters }
