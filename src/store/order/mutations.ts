import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { OrderState } from './state'
import { UserOrderDetail } from './types'

type OrderMutations<S = OrderState> = {
  [MutationTypes.SetUserOrderDetails] (state: S, payload: Array<UserOrderDetail>): void
  [MutationTypes.SetTotalAmount] (state: S, payload: number): void
  [MutationTypes.SetDurationDays] (state: S, payload: number): void
  [MutationTypes.SetTotalCapacity] (state: S, payload: number): void
}

const mutations: MutationTree<OrderState> & OrderMutations = {
  [MutationTypes.SetUserOrderDetails] (state: OrderState, payload: Array<UserOrderDetail>) {
    state.userOrderDetails = payload
  },
  [MutationTypes.SetTotalAmount] (state: OrderState, payload: number) {
    state.totalAmount += payload
  },
  [MutationTypes.SetDurationDays] (state: OrderState, payload: number) {
    state.durationDays = payload
  },
  [MutationTypes.SetTotalCapacity] (state: OrderState, payload: number) {
    state.totalCapacity += payload
  }
}

export { OrderMutations, mutations }
