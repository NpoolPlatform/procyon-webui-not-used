import { Module } from 'vuex'
import { RootState } from '../index'
import { state, GoodState } from './state'
import { GoodActions, actions } from './actions'
import { GoodGetters, getters } from './getters'
import { GoodMutations, mutations } from './mutations'

const goods: Module<GoodState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  goods,
  GoodState,
  actions,
  GoodActions,
  mutations,
  GoodMutations,
  getters,
  GoodGetters
}
