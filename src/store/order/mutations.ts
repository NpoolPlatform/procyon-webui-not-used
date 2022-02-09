import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { OrderState } from './state'
import { UserOrder } from './types'

type OrderMutations<S = OrderState> = {
  [MutationTypes.SetUserOrders] (state: S, payload: Array<UserOrder>): void
  [MutationTypes.SetTotalAmount] (state: S, payload: number): void
  [MutationTypes.SetDurationDays] (state: S, payload: number): void
  [MutationTypes.SetTotalCapacity] (state: S, payload: number): void
}

const mutations: MutationTree<OrderState> & OrderMutations = {
  [MutationTypes.SetUserOrders] (state: OrderState, payload: Array<UserOrder>) {
    state.userOrders = payload
  },
  [MutationTypes.SetTotalAmount] (state: OrderState, payload: number) {
    state.totalAmount = payload
  },
  [MutationTypes.SetDurationDays] (state: OrderState, payload: number) {
    state.durationDays = payload
  },
  [MutationTypes.SetTotalCapacity] (state: OrderState, payload: number) {
    state.totalCapacity = payload
  }
}

export { OrderMutations, mutations }
