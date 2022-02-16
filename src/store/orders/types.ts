import { Account } from '../accounts/types'
import { Coin } from '../coins/types'
import { Good } from '../goods/types'
import { ReqMessage } from '../notifications/types'

export interface GetOrdersByAppUserRequest {
  AppID?: string
  UserID?: string
}

interface Payment {
  ID: string,
  OrderID: string,
  AccountID: string
  Amount: number,
  CoinInfoID: string
  State: string,
  ChainTransactionID: string,
  PlatformTransactionID: string
  CreateAt: number
}

export interface OrderBase {
  ID: string
  AppID: string
  CouponID: string
  DiscountCouponID: string
  Start: number
  End: number
  GoodID: string
  Units: number
  UserID: string
  UserSpecialReductionID: string
  Payment: Payment
  CreateAt: number
}

export interface Fees {
  ID: string,
  AppID: string,
  Fee: {
    ID: string,
    FeeType: string,
    FeeDescription: string,
    PayType: string
  },
  Value: number
}

interface UserSpecialReduction {
  ID: string
  AppID: string
  Amount: number
  DurationDays: number
  Message: string
  Start: number
}

export interface Order {
  Good: Good
  Order: OrderBase
  UserSpecialReduction: UserSpecialReduction
  PayWithCoin: Coin
  PayToAccount: Account
}

export interface GetOrdersByAppUserResponse {
  Infos: Array<Order>
}

export interface SubmitOrderRequest {
  GoodID: string
  Units: number
  CouponID?: string
  DiscountCouponID?: string
  UserSpecialReductionID?: string
  Message: ReqMessage
}

export interface SubmitOrderResponse {
  Info: Order
}

export interface UserOrder {
  ID: string
  Date: string
  Product: string
  Amount: string
  Price: string
  Discount: string
  TechFee: string
  Period: string
  Total: string
  Paid: boolean
  PayCoinUnit: string
  CreateAt: number
  StartAt: number
}

export interface Fee {
  ID: string
  DurationDays: number
}

export interface CreateOrderPaymentRequest {
  OrderID: string
  PaymentCoinTypeID: string
  Fees: Array<Fee>
  Message: ReqMessage
}

export interface CreateOrderPaymentResponse {
  Info: Order
}

export interface GetOrderRequest {
  ID: string
  Message: ReqMessage
}

export interface GetOrderResponse {
  Info: Order
}

export enum OrderURLPath {
  GET_ORDERS_BY_APP_USER = '/cloud-hashing-apis-v2/v1/get/orders/by/app/user',
  SUBMIT_ORDER = '/cloud-hashing-apis-v2/v1/submit/order',
  CREATE_ORDER_PAYMENT = '/cloud-hashing-apis-v2/v1/create/order/payment',
  GET_ORDER = '/cloud-hashing-apis-v2/v1/get/order'
}
