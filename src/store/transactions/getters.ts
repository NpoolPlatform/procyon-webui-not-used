import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { TransactionsState } from './state'
import { Transaction } from './types'

type TransactionGetters = {
  getTransactions (state: TransactionsState): Array<Transaction>
}

const getters: GetterTree<TransactionsState, RootState> & TransactionGetters = {
  getTransactions: (state: TransactionsState): Array<Transaction> => state.Transactions
}

export { TransactionGetters, getters }
