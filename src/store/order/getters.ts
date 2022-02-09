import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { OrderState } from './state'
import { UserOrder } from './types'

type OrderGetters = {
  getUserOrders (state: OrderState): Array<UserOrder>
  getTotalAmount (state: OrderState): number
  getDurationDays (state: OrderState): number
  getTotalCapacity (state: OrderState): number
}

const getters: GetterTree<OrderState, RootState> & OrderGetters = {
  getUserOrders: (state: OrderState): Array<UserOrder> => state.userOrders,
  getTotalAmount: (state: OrderState): number => state.totalAmount,
  getDurationDays: (state: OrderState): number => state.durationDays,
  getTotalCapacity: (state: OrderState): number => state.totalCapacity
}

export { OrderGetters, getters }
