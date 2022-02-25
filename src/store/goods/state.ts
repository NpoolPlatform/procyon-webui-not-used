import { Good, Promotion, RecommendGood } from './types'

interface GoodState {
  goods: Array<Good>
  recommends: Array<RecommendGood>
  promotions: Array<Promotion>
  loading: boolean
  error: string
}

function state (): GoodState {
  return {
    goods: [],
    recommends: [],
    promotions: [],
    loading: false,
    error: ''
  }
}

export { state, GoodState }
