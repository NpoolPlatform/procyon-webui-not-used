import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { TransactionsState } from './state'
import { Transaction } from './types'

type TransactionGetters = {
  getTransactions (state: TransactionsState): Array<Transaction>
  getTransactionsByCoin (state: TransactionsState): (coinTypeID: string) => Array<Transaction>
}

const getters: GetterTree<TransactionsState, RootState> & TransactionGetters = {
  getTransactions: (state: TransactionsState): Array<Transaction> => state.Transactions,
  getTransactionsByCoin (state: TransactionsState): (coinTypeID: string) => Array<Transaction> {
    return (coinTypeID: string): Array<Transaction> => {
      const txs = [] as Array<Transaction>
      state.Transactions.forEach((tx) => {
        if (tx.CoinTypeID === coinTypeID) {
          txs.push(tx)
        }
      })
      return txs
    }
  }
}

export { TransactionGetters, getters }
