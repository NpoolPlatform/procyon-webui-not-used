import { Module } from 'vuex'
import { RootState } from '../index'
import { state, TransactionsState } from './state'
import { TransactionActions, actions } from './actions'
import { TransactionGetters, getters } from './getters'
import { TransactionMutations, mutations } from './mutations'

const transactions: Module<TransactionsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  transactions, TransactionsState,
  actions, TransactionActions,
  mutations, TransactionMutations,
  getters, TransactionGetters
}
