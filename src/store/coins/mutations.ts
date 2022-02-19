import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { CoinsState } from './state'
import { Coin } from './types'

type CoinMutations<S = CoinsState> = {
  [MutationTypes.SetCoins] (state: S, payload: Array<Coin>): void
  [MutationTypes.SetCoinsCurrencies] (state: S, payload: Record<string, Record<string, number>>): void
}

const mutations: MutationTree<CoinsState> & CoinMutations = {
  [MutationTypes.SetCoins] (state: CoinsState, payload: Array<Coin>) {
    payload.forEach((coin) => {
      state.Coins.set(coin.ID as string, coin)
    })
  },
  [MutationTypes.SetCoinsCurrencies] (state: CoinsState, payload: Record<string, Record<string, number>>): void {
    state.CoinsCurrencies = payload
  }
}

export { CoinMutations, mutations }
