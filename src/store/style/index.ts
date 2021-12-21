import { Module } from 'vuex'
import { RootState } from '../index'
import { state, StyleState } from './state'
import { StyleGetters, getters } from './getters'
import { StyleMutations, mutations } from './mutations'

const style: Module<StyleState, RootState> = {
  // namespaced: true,
  getters,
  mutations,
  state
}

export {
  style,
  StyleState, state,
  StyleMutations, mutations,
  StyleGetters, getters
}
