import { Module } from 'vuex'
import { RootState } from '../index'
import { state, UserState } from './state'
import { UserActions, actions } from './actions'
import { UserGetters, getters } from './getters'
import { UserMutations, mutations } from './mutations'

const users: Module<UserState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  users,
  UserState,
  actions,
  UserActions,
  mutations,
  UserMutations,
  getters,
  UserGetters
}
