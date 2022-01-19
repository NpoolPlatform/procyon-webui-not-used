export interface GetOrdersDetailByAppUserRequest {
  AppID?: string
  UserID?: string
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

export interface OrderDetail {
  ID: string
  Good: {
    ID: string
    DeviceInfo: {
      ID: string
      Type: string
      Manufacturer: string
      PowerComsuption: number,
      ShipmentAt: number
    },
    SeparateFee: boolean,
    UnitPower: number,
    DurationDays: number,
    CoinInfo: {
      ID: string
      PreSale: boolean,
      Name: string
      Unit: string
      Logo: string
    },
    Actuals: boolean,
    DeliveryAt: number,
    InheritFromGood: {
      ID: string,
      DeviceInfoID: string,
      SeparateFee: boolean,
      UnitPower: number,
      DurationDays: number,
      CoinInfoID: string,
      Actuals: boolean,
      DeliveryAt: number,
      InheritFromGoodID: string,
      VendorLocationID: string,
      Price: number,
      BenefitType: string,
      Classic: boolean,
      SupportCoinTypeIDs: Array<string>,
      Total: number,
      PriceCurrency: string,
      Title: string,
      Unit: string
    } | null,
    VendorLocation: {
      ID: string,
      Country: string,
      Province: string,
      City: string,
      Address: string
    },
    Price: number,
    BenefitType: string,
    Classic: boolean,
    SupportCoins: [
      {
        ID: string,
        PreSale: boolean,
        Name: string,
        Unit: string,
        Logo: string
      }
    ] | [],
    Total: number,
    Extra: {
      ID: string,
      GoodID: string,
      Posters: [
        string
      ] | [],
      Labels: [
        string
      ] | [],
      OutSale: boolean,
      PreSale: boolean,
      VoteCount: number,
      Rating: number
    },
    Title: string,
    Unit: string,
    PriceCurrency: {
      ID: string,
      Name: string,
      Unit: string,
      Symbol: string
    },
    Fees: Array<FeesDetails>
  },
  AppID: string,
  UserID: string,
  Units: number,
  DiscountCoupon: {
    ID: string,
    UserID: string,
    AppID: string,
    Pool: {
      ID: string,
      AppID: string,
      ReleaseByUserID: string,
      Discount: number,
      Start: number,
      DurationDays: number,
      Message: string,
      Name: string
    }
  } | null,
  UserSpecialReduction: {
    ID: string,
    AppID: string,
    UserID: string,
    Amount: number,
    ReleaseByUserID: string,
    Start: number,
    DurationDays: number,
    Message: string
  },
  GoodPaying: {
    ID: string,
    OrderID: string,
    PaymentID: string
  },
  GasPayings: [
    {
      ID: string,
      OrderID: string,
      PaymentID: string,
      DurationMinutes: number
    }
  ] | [],
  Compensates: [
    {
      ID: string,
      OrderID: string,
      Start: number,
      End: number,
      Message: string
    }
  ] | [],
  OutOfGases: [
    {
      ID: string,
      OrderID: string,
      Start: number,
      End: number
    }
  ] | [],
  Payment: {
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
  },
  Start: number,
  End: number,
  Coupon: {
    ID: string,
    UserID: string,
    AppID: string,
    Pool: {
      ID: string,
      AppID: string,
      Denomination: number,
      Start: number,
      DurationDays: number,
      Message: string,
      Name: string
    }
  } | null,
  Discount: number,
  SpecialReductionAmount: number
}

export interface GetOrdersDetailByAppUserResponse {
  Details: Array<OrderDetail>
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
