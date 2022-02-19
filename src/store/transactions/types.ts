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

interface UserWithdraw {
  ID?: string
  CoinTypeID: string
  WithdrawToAccountID: string
  Amount: number
}

interface SubmitUserWithdrawRequest {
  Info: UserWithdraw
  Account: string
  AccountType: string
  VerificationCode: string
  Message: ReqMessage
}

interface UserWithdrawState {
  Withdraw: UserWithdraw
  State: string
  Message: UserWithdrawState
}

interface SubmitUserWithdrawResponse {
  Info: UserWithdrawState
}

export {
  Transaction,
  GetTransactionsRequest,
  GetTransactionsResponse,
  UserWithdraw,
  UserWithdrawState,
  SubmitUserWithdrawRequest,
  SubmitUserWithdrawResponse
}
