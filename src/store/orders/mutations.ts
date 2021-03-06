import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { OrderState } from './state'
import { Order, Payment } from './types'

type OrderMutations<S = OrderState> = {
  [MutationTypes.SetOrder] (state: S, payload: Order): void
  [MutationTypes.SetOrders] (state: S, payload: Array<Order>): void
  [MutationTypes.SetOrderPayment] (state: S, payload: Order): void
  [MutationTypes.SetPayment] (state: S, payload: Payment): void
}

const setOrder = (state: OrderState, payload: Order) => {
  let pos = -1
  for (let i = 0; i < state.orders.length; i++) {
    if (state.orders[i].Order.Order.ID === payload.Order.Order.ID) {
      pos = i
      break
    }
  }
  if (pos < 0) {
    state.orders.splice(0, 0, payload)
  } else {
    state.orders.splice(pos, 1, payload)
  }
}

const mutations: MutationTree<OrderState> & OrderMutations = {
  [MutationTypes.SetOrder] (state: OrderState, payload: Order) {
    setOrder(state, payload)
  },
  [MutationTypes.SetOrderPayment] (state: OrderState, payload: Order) {
    setOrder(state, payload)
  },
  [MutationTypes.SetOrders] (state: OrderState, payload: Array<Order>) {
    state.orders = payload
  },
  [MutationTypes.SetPayment] (state: OrderState, payload: Payment) {
    state.orders.forEach((order, index) => {
      if (order.Order.Payment.ID === payload.ID) {
        state.orders[index].Order.Payment = payload
      }
    })
  }
}

export { OrderMutations, mutations }
