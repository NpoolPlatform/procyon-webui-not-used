import { AppGood, Good, Promotion, RecommendGood } from './types'

interface GoodState {
  goods: Array<Good>
  recommends: Array<RecommendGood>
  promotions: Array<Promotion>
  appGoods: Array<AppGood>
  loading: boolean
  error: string
}

function state (): GoodState {
  return {
    goods: [],
    recommends: [],
    promotions: [],
    appGoods: [],
    loading: false,
    error: ''
  }
}

export { state, GoodState }
