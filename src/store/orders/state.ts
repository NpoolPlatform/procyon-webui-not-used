import { Order } from './types'

interface OrderState {
  orders: Array<Order>
}

function state (): OrderState {
  return {
    orders: []
  }
}

export { state, OrderState }
