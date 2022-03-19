import { api } from 'src/boot/axios'
import { Referral } from './types'

export interface ReferralItem {
  Referral: Referral
  Children: Array<Referral>
}

export const referralTree = (referrals: Array<Referral>): Array<ReferralItem> => {
  const headers = api.defaults.headers as Record<string, string>
  const userID = headers['X-User-ID']

  let referral = {} as Referral
  for (const r of referrals) {
    if (r.User.ID === userID) {
      referral = r
      break
    }
  }

  const root = {
    Referral: referral,
    Children: referrals.filter((r) => r.User.ID !== userID)
  } as ReferralItem

  return [root]
}
