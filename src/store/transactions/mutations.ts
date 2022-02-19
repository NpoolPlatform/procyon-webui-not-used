import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { TransactionsState } from './state'
import { Transaction, UserWithdrawState } from './types'

type TransactionMutations<S = TransactionsState> = {
  [MutationTypes.SetTransactions] (state: S, payload: Array<Transaction>): void
  [MutationTypes.SetWithdraws] (state: S, payload: Array<UserWithdrawState>): void
}

const mutations: MutationTree<TransactionsState> & TransactionMutations = {
  [MutationTypes.SetTransactions] (state: TransactionsState, payload: Array<Transaction>) {
    state.Transactions = payload
  },
  [MutationTypes.SetWithdraws] (state: TransactionsState, payload: Array<UserWithdrawState>): void {
    state.Withdraws = payload
  }
}

export { TransactionMutations, mutations }
