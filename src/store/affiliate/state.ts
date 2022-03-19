import { Referral } from './types'

interface AffiliateState {
  referrals: Array<Referral>
}

function state (): AffiliateState {
  return {
    referrals: []
  }
}

export { state, AffiliateState }
