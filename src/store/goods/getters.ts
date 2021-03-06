import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { GoodState } from './state'
import { AppGood, Good, Promotion, RecommendGood } from './types'

type GoodGetters = {
  getGoods (state: GoodState): Array<Good>
  getRecommends (state: GoodState): Array<RecommendGood>
  getPromotions (state: GoodState): Array<Promotion>
  getAppGoods (state: GoodState): Array<AppGood>
  getGoodByID (state: GoodState): (goodID: string) => Good | undefined
}

const getters: GetterTree<GoodState, RootState> & GoodGetters = {
  getGoods: (state: GoodState): Array<Good> => state.goods.filter((good) => {
    for (const appGood of state.appGoods) {
      if (good.Good.Good.ID === appGood.GoodID && appGood.Online && appGood.Price > 0) {
        return true
      }
    }
    return false
  }),
  getAppGoods: (state: GoodState): Array<AppGood> => state.appGoods.filter((good) => good.Price > 0 && good.Online),
  getRecommends: (state: GoodState): Array<RecommendGood> => state.recommends.filter((good) => {
    for (const appGood of state.appGoods) {
      if (good.Good.Good.Good.ID === appGood.GoodID && appGood.Online && appGood.Price > 0) {
        return true
      }
    }
    return false
  }),
  getPromotions: (state: GoodState): Array<Promotion> => state.promotions.filter((good) => {
    for (const appGood of state.appGoods) {
      if (good.GoodID === appGood.GoodID && appGood.Online && appGood.Price > 0) {
        return true
      }
    }
    return false
  }),
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
