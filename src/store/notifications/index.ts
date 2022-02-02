import { Module } from 'vuex'
import { RootState } from '../index'
import { state, NotificationState } from './state'
import { NotificationGetters, getters } from './getters'
import { NotificationMutations, mutations } from './mutations'

const notifications: Module<NotificationState, RootState> = {
  // namespaced: true,
  getters,
  mutations,
  state
}

export {
  notifications, NotificationState,
  mutations, NotificationMutations,
  getters, NotificationGetters
}
