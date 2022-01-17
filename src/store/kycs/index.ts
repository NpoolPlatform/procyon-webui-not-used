import { Module } from 'vuex'
import { RootState } from '../index'
import { state, KYCState } from './state'
import { KYCActions, actions } from './actions'
import { KYCGetters, getters } from './getters'
import { KYCMutations, mutations } from './mutations'

const kyc: Module<KYCState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  kyc,
  KYCState,
  actions,
  KYCActions,
  mutations,
  KYCMutations,
  getters,
  KYCGetters
}
