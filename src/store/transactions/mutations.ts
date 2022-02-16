import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { TransactionsState } from './state'
import { Transaction } from './types'

type TransactionMutations<S = TransactionsState> = {
  [MutationTypes.SetTransactions] (state: S, payload: Array<Transaction>): void
}

const mutations: MutationTree<TransactionsState> & TransactionMutations = {
  [MutationTypes.SetTransactions] (state: TransactionsState, payload: Array<Transaction>) {
    state.Transactions = payload
  }
}

export { TransactionMutations, mutations }
