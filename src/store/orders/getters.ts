import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { OrderState } from './state'
import { Order } from './types'

type OrderGetters = {
  getOrders (state: OrderState): Array<Order>
  getOrderByID (state: OrderState): (orderID: string) => Order | undefined
  getTotalAmount (state: OrderState): number
  getDurationDays (state: OrderState): number
  getTotalCapacity (state: OrderState): number
}

const getters: GetterTree<OrderState, RootState> & OrderGetters = {
  getOrders: (state: OrderState): Array<Order> => state.orders,
  getOrderByID: (state: OrderState): (orderID: string) => Order | undefined => {
    return (orderID: string) => {
      for (let i = 0; i < state.orders.length; i++) {
        if (orderID === state.orders[i].Order.ID) {
          return state.orders[i]
        }
      }
      return undefined
    }
  },
  getTotalAmount: (state: OrderState): number => {
    let total = 0
    state.orders.forEach((order) => {
      total += order.Order.Payment.Amount
    })
    return total
  },
  getDurationDays: (state: OrderState): number => {
    if (state.orders.length > 0) {
      return state.orders[0].Good.Good.DurationDays
    }
    return 0
  },
  getTotalCapacity: (state: OrderState): number => {
    let total = 0
    state.orders.forEach((order) => {
      total += order.Order.Units
    })
    return total
  }
}

export { OrderGetters, getters }
