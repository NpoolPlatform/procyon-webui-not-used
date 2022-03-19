import { ReqMessage } from '../notifications/types'
import { AppUser, AppUserExtra } from '../users/types'

export interface Invitation {
  ID: string
  CreateAt: number
}

export interface CoinSummary {
  CoinTypeID: string
  Units: number
  Amount: number
  Unit: string
  CoinName: string
}

export interface Referral {
  User: AppUser
  Extra: AppUserExtra
  Invitation: Invitation
  USDAmount: number
  SubUSDAmount: number
  Kol: boolean
  Summaries: Array<CoinSummary>
}

export interface GetReferralsRequest {
  Message: ReqMessage
}

export interface GetReferralsResponse {
  Infos: Array<Referral>
}

export enum AffiliateURLPath {
  GET_REFERRALS = '/cloud-hashing-apis-v2/v1/get/referrals'
}
