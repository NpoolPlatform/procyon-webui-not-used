export interface GoodDetail {
  ID: string
  DeviceInfo: {
    ID: string
    Type: string
    Manufacturer: string
    PowerComsuption: number
    ShipmentAt: number
  }
  SeparateFee: boolean
  UnitPower: number
  DurationDays: number
  CoinInfo: {
    ID: string
    PreSale: boolean
    Name: string
    Unit: string
    Logo: string
  }
  Actuals: boolean
  DeliveryAt: number
  InheritFromGood: {
    ID: string
    DeviceInfoID: string
    SeparateFee: boolean
    UnitPower: number
    DurationDays: number
    CoinInfoID: string
    Actuals: boolean
    DeliveryAt: number
    InheritFromGoodID: string
    VendorLocationID: string
    Price: number
    BenefitType: string
    Classic: boolean
    SupportCoinTypeIDs: []
    Total: number
    PriceCurrency: string
    Title: string
    Unit: string
    Start: number
  }
  VendorLocation: {
    ID: string
    Country: string
    Province: string
    City: string
    Address: string
  }
  Price: number
  BenefitType: string
  Classic: boolean
  SupportCoins: [
    {
      ID: string
      PreSale: boolean
      Name: string
      Unit: string
      Logo: string
    }
  ]
  Total: number
  Extra: {
    ID: string
    GoodID: string
    Posters: []
    Labels: []
    OutSale: boolean
    PreSale: boolean
    VoteCount: number
    Rating: number
  }
  Title: string
  Unit: string
  Start: number
  PriceCurrency: {
    ID: string
    Name: string
    Unit: string
    Symbol: string
  }
  Fees: [
    {
      Fee: {
        ID: string
        AppID: string
        FeeType: string
        FeeDescription: string
        PayType: string
      }
      Value: number
    }
  ]
}

export interface GetGoodDetailsRequest {
  AppID?: string
}

export interface GetGoodDetailsResponse {
  Details: Array<GoodDetail>
  Total: number
}

export interface GetGoodDetailRequest {
  ID: string
}

export interface GetGoodDetailResponse {
  Detail: GoodDetail
}

export enum GoodURLPath {
  GET_GOOD_DETAILS = '/cloud-hashing-apis-v2/v1/get/goods/detail',
  GET_GOOD_DETAIL = '/cloud-hashing-apis-v2/v1/get/good/detail'
}
