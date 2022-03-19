import { ReqMessage } from '../notifications/types'
import { AppUser, AppUserExtra } from '../users/types'

export interface Invitation {
  ID: string
  CreateAt: number
}

export interface Referral {
  User: AppUser
  Extra: AppUserExtra
  Invitation: Invitation
  USDAmount: number
  SubUSDAmount: number
  Kol: boolean
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
