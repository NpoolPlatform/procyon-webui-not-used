import { Transaction } from './types'

interface TransactionsState {
  Transactions: Array<Transaction>
}

function state (): TransactionsState {
  return {
    Transactions: []
  }
}

export {
  state,
  TransactionsState
}
