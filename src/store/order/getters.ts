import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { OrderState } from './state'
import { UserOrderDetail } from './types'

type OrderGetters = {
  getUserOrderDetails (state: OrderState): Array<UserOrderDetail>
  getTotalAmount (state: OrderState): number
  getDurationDays (state: OrderState): number
  getTotalCapacity (state: OrderState): number
}

const getters: GetterTree<OrderState, RootState> & OrderGetters = {
  getUserOrderDetails: (state: OrderState): Array<UserOrderDetail> => state.userOrderDetails,
  getTotalAmount: (state: OrderState): number => state.totalAmount,
  getDurationDays: (state: OrderState): number => state.durationDays,
  getTotalCapacity: (state: OrderState): number => state.totalCapacity
}

export { OrderGetters, getters }
