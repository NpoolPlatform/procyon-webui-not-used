import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { GoodState } from './state'
import { Good, RecommendGood } from './types'

type GoodMutations<S = GoodState> = {
  [MutationTypes.SetGoods] (state: S, payload: Array<Good>): void
  [MutationTypes.SetRecommendGoods] (state: S, payload: Array<RecommendGood>): void
  [MutationTypes.SetGood] (state: S, payload: Good): void
}

const mutations: MutationTree<GoodState> & GoodMutations = {
  [MutationTypes.SetGoods] (state: GoodState, payload: Array<Good>) {
    state.goods = payload
  },
  [MutationTypes.SetRecommendGoods] (state: GoodState, payload: Array<RecommendGood>): void {
    state.recommends = payload
  },
  [MutationTypes.SetGood] (state: GoodState, payload: Good) {
    let found = false
    state.goods.forEach((good) => {
      if (payload.Good.Good.ID === good.Good.Good.ID) {
        found = true
      }
    })
    if (!found) {
      state.goods.push(payload)
    }
  }
}

export { GoodMutations, mutations }
