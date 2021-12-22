import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { GoodState } from './state'
import { GoodDetail } from './types'

type GoodMutations<S = GoodState> = {
  [MutationTypes.SetGoodDetails] (state: S, payload: GoodDetail[]): void
  [MutationTypes.SetError] (state: S, payload: string): void
  [MutationTypes.SetLoading] (state: S, payload: boolean): void
}

const mutations: MutationTree<GoodState> & GoodMutations = {
  [MutationTypes.SetGoodDetails] (state: GoodState, payload: GoodDetail[]) {
    state.goods = payload
  },
  [MutationTypes.SetError] (state: GoodState, payload: string) {
    state.error = payload
  },
  [MutationTypes.SetLoading] (state: GoodState, payload: boolean) {
    state.loading = payload
  }
}

export { GoodMutations, mutations }
