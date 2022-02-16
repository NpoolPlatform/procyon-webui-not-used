import { ReqMessage } from '../notifications/types'

interface Transaction {
  ID: string
  AppID: string
  UserID: string
  FromAddressID: string
  ToAddressID: string
  CoinTypeID: string
  Amount: number
  Message: string
  CreateAt: number
  State: string
  ChainTransactionID: string
}

interface GetTransactionsRequest {
  Message: ReqMessage
}

interface GetTransactionsResponse {
  Infos: ReadonlyArray<Transaction>
}

export {
  Transaction,
  GetTransactionsRequest,
  GetTransactionsResponse
}
