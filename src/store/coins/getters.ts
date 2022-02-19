import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { CoinsState } from './state'
import { Coin } from './types'

type CoinGetters = {
  getCoinByID (state: CoinsState): (id: string) => Coin
  getCoins (state: CoinsState): Array<Coin>
  getCoinCurrency (state: CoinsState): (id: string, currency: string) => number
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
  },
  getCoinCurrency: (state: CoinsState): (id: string, currency: string) => number => {
    return (id: string, currency: string) => {
      const coin = state.Coins.get(id)
      if (!coin) {
        return 0
      }

      if (!state.CoinsCurrencies) {
        return 0
      }

      const coinCurrencyMap = new Map<string, string>()
      coinCurrencyMap.set('FIL', 'filecoin')
      coinCurrencyMap.set('BTC', 'bitcoin')
      coinCurrencyMap.set('ETH', 'ethereum')

      const coinCurrency = state.CoinsCurrencies[coinCurrencyMap.get(coin.Name) as string]
      if (!coinCurrency) {
        return 0
      }
      return coinCurrency[currency]
    }
  }
}

export { CoinGetters, getters }
