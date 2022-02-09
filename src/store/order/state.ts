import { UserOrder } from './types'

interface OrderState {
  userOrders: Array<UserOrder>
  totalAmount: number
  totalCapacity: number
  durationDays: number
}

function state (): OrderState {
  return {
    userOrders: [],
    totalAmount: 0,
    totalCapacity: 0,
    durationDays: 0
  }
}

export { state, OrderState }
