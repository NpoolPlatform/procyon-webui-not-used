import { Module } from 'vuex'
import { RootState } from '../index'
import { state, VerifyState } from './state'
import { VerifyActions, actions } from './actions'
import { VerifyGetters, getters } from './getters'
import { VerifyMutations, mutations } from './mutations'

const verify: Module<VerifyState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  verify,
  VerifyState,
  actions,
  VerifyActions,
  mutations,
  VerifyMutations,
  getters,
  VerifyGetters
}
