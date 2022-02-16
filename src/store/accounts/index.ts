import { Module } from 'vuex'
import { RootState } from '../index'
import { state, AccountsState } from './state'
import { AccountActions, actions } from './actions'
import { AccountGetters, getters } from './getters'
import { AccountMutations, mutations } from './mutations'

const accounts: Module<AccountsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  accounts, AccountsState,
  actions, AccountActions,
  mutations, AccountMutations,
  getters, AccountGetters
}
