import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { CoinsState } from './state'
import { Coin, CommissionCoin } from './types'

type CoinGetters = {
  getCoinByID (state: CoinsState): (id: string) => Coin
  getCommissionCoins (state: CoinsState): Array<CommissionCoin>
  getCoins (state: CoinsState): Array<Coin>
  getCoinCurrency (state: CoinsState): (id: string, currency: string) => number
  getCoinsCurrencies (state: CoinsState): Record<string, Record<string, number>>
}

const getters: GetterTree<CoinsState, RootState> & CoinGetters = {
  getCoinByID: (state: CoinsState): (id: string) => Coin => {
    return (id: string) => state.Coins.get(id) as Coin
  },
  getCommissionCoins: (state: CoinsState): Array<CommissionCoin> => state.CommissionCoins,
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
      coinCurrencyMap.set('filecoin', 'filecoin')
      coinCurrencyMap.set('bitcoin', 'bitcoin')
      coinCurrencyMap.set('ethereum', 'ethereum')
      coinCurrencyMap.set('tfilecoin', 'filecoin')
      coinCurrencyMap.set('tbitcoin', 'bitcoin')
      coinCurrencyMap.set('tethereum', 'ethereum')

      const coinCurrency = state.CoinsCurrencies[coinCurrencyMap.get(coin.Name) as string]
      if (!coinCurrency) {
        return 0
      }
      return coinCurrency[currency]
    }
  },
  getCoinsCurrencies: (state: CoinsState): Record<string, Record<string, number>> => state.CoinsCurrencies as Record<string, Record<string, number>>
}

export { CoinGetters, getters }
