import { Transaction, UserWithdrawState } from './types'

interface TransactionsState {
  Transactions: Array<Transaction>
  Withdraws: Array<UserWithdrawState>
}

function state (): TransactionsState {
  return {
    Transactions: [],
    Withdraws: []
  }
}

export {
  state,
  TransactionsState
}
