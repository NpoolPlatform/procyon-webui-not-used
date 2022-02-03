import { Module } from 'vuex'
import { RootState } from '../index'
import { state, ApplicationState } from './state'
import { ApplicationGetters, getters } from './getters'
import { ApplicationMutations, mutations } from './mutations'
import { ApplicationActions, actions } from './actions'

const application: Module<ApplicationState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  application, ApplicationState,
  mutations, ApplicationMutations,
  getters, ApplicationGetters,
  actions, ApplicationActions
}
