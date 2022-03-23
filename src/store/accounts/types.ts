import { ReqMessage } from '../notifications/types'

interface Withdraw {
  ID: string
  CoinTypeID: string
  AccountID: string
  Name: string
  Message: string
  CreateAt: number
  Labels?: Array<string>
}

interface Account {
  ID: string
  CoinTypeID: string
  Address: string
  CreateAt: number
}

interface WithdrawAccount {
  Address: Withdraw
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
  Labels?: Array<string>
  Account: string
  AccountType: string
  VerificationCode: string
  NotifyMessage: ReqMessage
}

interface SetWithdrawAddressResponse {
  Info: WithdrawAccount
}

interface DeleteWithdrawAddressRequest {
  ID: string
  Message: ReqMessage
}

interface DeleteWithdrawAddressResponse {
  Info: Withdraw
}

export {
  Withdraw,
  Account,
  WithdrawAccount,
  GetWithdrawAccountsRequest,
  GetWithdrawAccountsResponse,
  SetWithdrawAddressRequest,
  SetWithdrawAddressResponse,
  DeleteWithdrawAddressRequest,
  DeleteWithdrawAddressResponse
}
