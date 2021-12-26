import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { GoodState } from './state'
import { GoodDetail } from './types'

type GoodMutations<S = GoodState> = {
  [MutationTypes.SetGoodDetails] (state: S, payload: Array<GoodDetail>): void
}

const mutations: MutationTree<GoodState> & GoodMutations = {
  [MutationTypes.SetGoodDetails] (state: GoodState, payload: Array<GoodDetail>) {
    state.goods = payload
  }
}

export { GoodMutations, mutations }
