import { Account } from '../accounts/types'
import { Coin } from '../coins/types'
import { Good } from '../goods/types'
import { ReqMessage } from '../notifications/types'

export interface GetOrdersByAppUserRequest {
  AppID?: string
  UserID?: string
}

export interface Payment {
  ID: string,
  OrderID: string,
  AccountID: string
  Amount: number,
  CoinInfoID: string
  State: string,
  ChainTransactionID: string,
  PlatformTransactionID: string
  CreateAt: number
  UserSetPaid: boolean
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
  CreateAt: number
  PromotionID: string
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

interface MyOrder {
  Order: OrderBase
  Payment: Payment
}

export interface Order {
  Good: Good
  Order: MyOrder
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
  EndAt: number
  UserSetPaid: boolean
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

export interface UpdatePaymentRequest {
  Info: Payment
  Message: ReqMessage
}

export interface UpdatePaymentResponse {
  Info: Payment
}

export enum OrderURLPath {
  GET_ORDERS_BY_APP_USER = '/cloud-hashing-apis-v2/v1/get/orders/by/app/user',
  SUBMIT_ORDER = '/cloud-hashing-apis-v2/v1/submit/order',
  CREATE_ORDER_PAYMENT = '/cloud-hashing-apis-v2/v1/create/order/payment',
  UPDATE_PAYMENT = '/cloud-hashing-order/v1/update/payment/by/user',
  GET_ORDER = '/cloud-hashing-apis-v2/v1/get/order'
}
