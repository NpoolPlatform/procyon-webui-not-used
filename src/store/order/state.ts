import { UserOrderDetail } from './types'

interface OrderState {
  userOrderDetails: Array<UserOrderDetail>
  totalAmount: number
  totalCapacity: number
  durationDays: number
}

function state (): OrderState {
  return {
    userOrderDetails: [],
    totalAmount: 0,
    totalCapacity: 0,
    durationDays: 0
  }
}

export { state, OrderState }
