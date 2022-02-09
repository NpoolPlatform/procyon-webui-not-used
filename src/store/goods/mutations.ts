import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { GoodState } from './state'
import { Good } from './types'

type GoodMutations<S = GoodState> = {
  [MutationTypes.SetGoods] (state: S, payload: Array<Good>): void
  [MutationTypes.SetGood] (state: S, payload: Good): void
}

const mutations: MutationTree<GoodState> & GoodMutations = {
  [MutationTypes.SetGoods] (state: GoodState, payload: Array<Good>) {
    state.goods = payload
  },
  [MutationTypes.SetGood] (state: GoodState, payload: Good) {
    let found = false
    state.goods.forEach((good) => {
      if (payload.Good.ID === good.Good.ID) {
        found = true
      }
    })
    if (!found) {
      state.goods.push(payload)
    }
  }
}

export { GoodMutations, mutations }
