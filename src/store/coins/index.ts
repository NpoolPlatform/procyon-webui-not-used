import { Module } from 'vuex'
import { RootState } from '../index'
import { state, CoinsState } from './state'
import { CoinGetters, getters } from './getters'
import { CoinMutations, mutations } from './mutations'
import { CoinActions, actions } from './actions'

const coins: Module<CoinsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  coins, CoinsState,
  mutations, CoinMutations,
  getters, CoinGetters,
  actions, CoinActions
}
