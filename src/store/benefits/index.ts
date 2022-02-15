import { Module } from 'vuex'
import { RootState } from '../index'
import { state, BenefitsState } from './state'
import { BenefitActions, actions } from './actions'
import { BenefitGetters, getters } from './getters'
import { BenefitMutations, mutations } from './mutations'

const benefits: Module<BenefitsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  benefits, BenefitsState,
  actions, BenefitActions,
  mutations, BenefitMutations,
  getters, BenefitGetters
}
