import { Coin } from './types'

interface CoinsState {
  Coins: Map<string, Coin>
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
