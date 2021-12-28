import { Module } from 'vuex'
import { RootState } from '../index'
import { state, AffiliateState } from './state'
import { AffiliateActions, actions } from './actions'
import { AffiliateGetters, getters } from './getters'
import { AffiliateMutations, mutations } from './mutations'

const affiliate: Module<AffiliateState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  affiliate,
  AffiliateState,
  actions,
  AffiliateActions,
  mutations,
  AffiliateMutations,
  getters,
  AffiliateGetters
}
