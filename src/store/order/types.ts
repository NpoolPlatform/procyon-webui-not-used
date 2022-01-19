import { GoodDetail } from '../goods/types'

export interface GetOrdersDetailByAppUserRequest {
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

export interface Order {
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

export interface FeesDetails {
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

export interface OrderDetail {
  ID: string
  Good: GoodDetail
  Order: Order
  UserSpecialReduction: UserSpecialReduction
}

export interface GetOrdersDetailByAppUserResponse {
  Infos: Array<OrderDetail>
}

export interface UserOrderDetail {
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
  GET_ORDERS_DETAIL_BY_APP_USER = '/cloud-hashing-apis-v2/v1/get/orders/by/app/user'
}
