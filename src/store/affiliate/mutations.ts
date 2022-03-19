import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AffiliateState } from './state'
import { Referral } from './types'

type AffiliateMutations<S = AffiliateState> = {
  [MutationTypes.SetReferrals] (state: S, payload: Array<Referral>): void
}

const mutations: MutationTree<AffiliateState> & AffiliateMutations = {
  [MutationTypes.SetReferrals] (state: AffiliateState, payload: Array<Referral>) {
    state.referrals = payload
  }
}

export { AffiliateMutations, mutations }
