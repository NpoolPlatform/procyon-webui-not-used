import { Good } from '../goods/types'

export interface GetOrdersByAppUserRequest {
  AppID?: string
  UserID?: string
}

interface Payment {
  ID: string,
  OrderID: string,
  Account: {
    ID: string,
    CoinTypeID: string,
    Address: string,
    AppID: string,
    UserID: string
  },
  Amount: number,
  CoinInfo: {
    ID: string,
    PreSale: boolean,
    Name: string,
    Unit: string,
    Logo: string
  },
  State: string,
  ChainTransactionID: string,
  PlatformTransactionID: string
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
}

export interface Feess {
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
  ID: string
  Good: Good
  Order: OrderBase
  UserSpecialReduction: UserSpecialReduction
}

export interface GetOrdersByAppUserResponse {
  Infos: Array<Order>
}

export interface UserOrder {
  Date: string
  Product: string
  Amount: string
  Price: string
  Discount: string
  TechFee: string
  Period: string
  Total: string
}

export enum OrderURLPath {
  GET_ORDERS_BY_APP_USER = '/cloud-hashing-apis-v2/v1/get/orders/by/app/user'
}
