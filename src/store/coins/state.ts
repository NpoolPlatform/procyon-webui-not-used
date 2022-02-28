import { Coin, CommissionCoin } from './types'

interface CoinsState {
  Coins: Map<string, Coin>
  CoinsCurrencies?: Record<string, Record<string, number>>
  CommissionCoins: Array<CommissionCoin>
}

function state (): CoinsState {
  return {
    Coins: new Map<string, Coin>(),
    CommissionCoins: []
  }
}

export {
  state,
  CoinsState
}
