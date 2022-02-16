import { ReqMessage } from '../notifications/types'

interface Withdraw {
  ID: string
  CoinTypeID: string
  AccountID: string
  CreateAt: number
}

interface Account {
  ID: string
  CoinTypeID: string
  Address: string
  CreateAt: number
}

interface WithdrawAccount {
  Withdraw: Withdraw
  Account: Account
}

interface GetWithdrawAccountsRequest {
  Message: ReqMessage
}

interface GetWithdrawAccountsResponse {
  Infos: ReadonlyArray<WithdrawAccount>
}

export {
  Account,
  WithdrawAccount,
  GetWithdrawAccountsRequest,
  GetWithdrawAccountsResponse
}
