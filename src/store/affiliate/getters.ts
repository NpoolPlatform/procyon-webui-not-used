import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AffiliateState } from './state'
import { Referral } from './types'

type AffiliateGetters = {
  getReferrals (state: AffiliateState): Array<Referral>
}

const getters: GetterTree<AffiliateState, RootState> & AffiliateGetters = {
  getReferrals: (state: AffiliateState): Array<Referral> => state.referrals
}

export { AffiliateGetters, getters }
