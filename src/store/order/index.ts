import { Module } from 'vuex'
import { RootState } from '../index'
import { state, OrderState } from './state'
import { OrderActions, actions } from './actions'
import { OrderGetters, getters } from './getters'
import { OrderMutations, mutations } from './mutations'

const order: Module<OrderState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  order,
  OrderState,
  actions,
  OrderActions,
  mutations,
  OrderMutations,
  getters,
  OrderGetters
}
