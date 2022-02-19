import { Coin } from './types'

interface CoinsState {
  Coins: Map<string, Coin>
  CoinsCurrencies?: Record<string, Record<string, number>>
}

function state (): CoinsState {
  return {
    Coins: new Map<string, Coin>()
  }
}

export {
  state,
  CoinsState
}
