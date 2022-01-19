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

export interface Good extends GoodBase {
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

export interface GoodDetail {
  Good: Good
  Main?: Coin
  SupportCoins?: Array<Coin>
}

export interface GetGoodDetailsRequest {
  AppID?: string
}

export interface GetGoodDetailsResponse {
  Infos: Array<GoodDetail>
  Total: number
}

export interface GetGoodDetailRequest {
  ID: string
}

export interface GetGoodDetailResponse {
  Detail: GoodDetail
}

export enum GoodURLPath {
  GET_GOOD_DETAILS = '/cloud-hashing-apis-v2/v1/get/goods',
  GET_GOOD_DETAIL = '/cloud-hashing-apis-v2/v1/get/good'
}
