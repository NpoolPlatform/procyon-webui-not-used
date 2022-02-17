import { Good, RecommendGood } from './types'

interface GoodState {
  goods: Array<Good>
  recommends: Array<RecommendGood>
  loading: boolean
  error: string
}

function state (): GoodState {
  return {
    goods: [],
    recommends: [],
    loading: false,
    error: ''
  }
}

export { state, GoodState }
