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
}

interface Fee {
  ID?: string
  AppID: string
  FeeTypeID: string
  Value: number
}

export interface GoodExtend extends GoodBase {
  DeviceInfo: DeviceInfo
  VendorLocation: VendorLocation
  Fees: Array<Fee>
  PriceCurrency: PriceCurrency
  Extra: GoodExtra
}

interface Coin {
  ID: string
  Name: string
  PreSale: boolean
  Unit: string
  Logo: string
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

export enum GoodURLPath {
  GET_GOODS = '/cloud-hashing-apis-v2/v1/get/goods',
  GET_GOOD = '/cloud-hashing-apis-v2/v1/get/good'
}
