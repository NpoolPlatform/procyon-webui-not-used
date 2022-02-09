import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { CoinsState } from './state'
import { Coin } from './types'

type CoinGetters = {
  getCoinByID (state: CoinsState): (id: string) => Coin
  getCoins (state: CoinsState): Array<Coin>
}

const getters: GetterTree<CoinsState, RootState> & CoinGetters = {
  getCoinByID: (state: CoinsState): (id: string) => Coin => {
    return (id: string) => state.Coins.get(id) as Coin
  },
  getCoins: (state: CoinsState): Array<Coin> => {
    const Coins: Array<Coin> = []
    state.Coins.forEach((val) => {
      Coins.push(val)
    })
    return Coins
  }
}

export { CoinGetters, getters }
