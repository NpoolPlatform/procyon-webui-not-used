import { ReqMessage } from '../notifications/types'

interface Withdraw {
  ID: string
  CoinTypeID: string
  AccountID: string
  Name: string
  Message: string
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
  State: string
  Message: string
  Account: Account
}

interface GetWithdrawAccountsRequest {
  Message: ReqMessage
}

interface GetWithdrawAccountsResponse {
  Infos: ReadonlyArray<WithdrawAccount>
}

interface SetWithdrawAddressRequest {
  CoinTypeID: string
  Address: string
  Name?: string
  Message?: string
  Account: string
  AccountType: string
  VerificationCode: string
  NotifyMessage: ReqMessage
}

interface SetWithdrawAddressResponse {
  Info: WithdrawAccount
}

export {
  Account,
  WithdrawAccount,
  GetWithdrawAccountsRequest,
  GetWithdrawAccountsResponse,
  SetWithdrawAddressRequest,
  SetWithdrawAddressResponse
}
