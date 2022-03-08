import { Coin } from '../coins/types'
import { ReqMessage } from '../notifications/types'

interface DeviceInfo {
  ID?: string
  Manufacturer: string
  Consumption: number
  ShipmentAt: number
  Type: string
}

interface VendorLocation {
  ID?: string
  Country: string
  Province: string
  City: string
  Address: string
}

interface PriceCurrency {
  ID?: string
  Name: string
  Unit: string
  Symbol: string
}

interface GoodExtra {
  ID: string
  GoodID: string
  Labels: Array<string>
  OutSale: boolean
  Posters: Array<string>
  PreSale: false
  Rating: number
  VoteCount: number
}

interface GoodBase {
  ID?: string
  SeparateFee: boolean
  UnitPower: number
  DurationDays: number
  Actuals: boolean
  DeliveryAt: number
  Price: number
  BenefitType: string
  Classic: boolean
  Title: string
  Total: number
  Unit: string
  StartAt: number
}

interface Fee {
  ID?: string
  AppID: string
  FeeTypeID: string
  Value: number
}

export interface GoodExtend {
  Good: GoodBase
  DeviceInfo: DeviceInfo
  VendorLocation: VendorLocation
  Fees: Array<Fee>
  PriceCurrency: PriceCurrency
  Extra: GoodExtra
}

export interface Good {
  Good: GoodExtend
  Main?: Coin
  SupportCoins?: Array<Coin>
}

export interface GetGoodsRequest {
  Message: ReqMessage
}

export interface GetGoodsResponse {
  Infos: Array<Good>
  Total: number
}

export interface GetGoodRequest {
  ID: string
  Message?: ReqMessage
}

export interface GetGoodResponse {
  Info: Good
}

export interface Recommend {
  ID: string
  GoodID: string
  RecommenderID: string
  Message: string
}

export interface RecommendGood {
  Recommend: Recommend
  Good: Good
}

export interface GetRecommendGoodsRequest {
  Message: ReqMessage
}

export interface GetRecommendGoodsResponse {
  Infos: Array<RecommendGood>
  Total: number
}

export interface Promotion {
  ID?: string
  AppID: string
  GoodID: string
  Message: string
  Start: number
  End: number
  Price: number
}

export interface GetPromotionsRequest {
  Message: ReqMessage
}

export interface GetPromotionsResponse {
  Infos: Array<Promotion>
}

export enum GoodURLPath {
  GET_GOODS = '/cloud-hashing-apis-v2/v1/get/goods/by/app',
  GET_RECOMMEND_GOODS = '/cloud-hashing-apis-v2/v1/get/recommend/goods/by/app',
  GET_PROMOTIONS = '/cloud-hashing-goods/v1/get/app/good/promotions/by/app',
  GET_GOOD = '/cloud-hashing-apis-v2/v1/get/good'
}
