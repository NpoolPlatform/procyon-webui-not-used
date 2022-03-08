import { ReqMessage } from '../notifications/types'

interface Coin {
  ID?: string
  Name: string
  PreSale: boolean
  ForPay: boolean
  Unit: string
  Logo: string
  ENV: string
}

interface GetCoinsResponse {
  Infos: ReadonlyArray<Coin>
}

interface GetCoinsRequest {
  Message: ReqMessage
}

interface CreateCoinRequest extends Coin {
  Message: ReqMessage
}

interface CreateCoinResponse {
  Info: Coin
}

interface GetCoinsCurrenciesRequest {
  Message: ReqMessage
}

interface CommissionCoin {
  ID: string
  CoinTypeID: string
  Using: boolean
}

interface GetCommissionCoinsRequest {
  Message: ReqMessage
}

interface GetCommissionCoinsResponse {
  Infos: Array<CommissionCoin>
}

export {
  Coin,
  GetCoinsRequest,
  GetCoinsResponse,
  CreateCoinRequest,
  CreateCoinResponse,
  GetCoinsCurrenciesRequest,
  CommissionCoin,
  GetCommissionCoinsRequest,
  GetCommissionCoinsResponse
}
