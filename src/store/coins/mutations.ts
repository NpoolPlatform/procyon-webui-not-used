import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { CoinsState } from './state'
import { Coin } from './types'

type CoinMutations<S = CoinsState> = {
  [MutationTypes.SetCoins] (state: S, payload: Array<Coin>): void
}

const mutations: MutationTree<CoinsState> & CoinMutations = {
  [MutationTypes.SetCoins] (state: CoinsState, payload: Array<Coin>) {
    payload.forEach((coin) => {
      state.Coins.set(coin.ID as string, coin)
    })
  }
}

export { CoinMutations, mutations }
