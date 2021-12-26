import { Module } from 'vuex'
import { RootState } from '../index'
import { state, NotifyState } from './state'
import { NotifyGetters, getters } from './getters'
import { NotifyMutations, mutations } from './mutations'

const notify: Module<NotifyState, RootState> = {
  // namespaced: true,
  getters,
  mutations,
  state
}

export {
  notify,
  NotifyState, state,
  NotifyMutations, mutations,
  NotifyGetters, getters
}
