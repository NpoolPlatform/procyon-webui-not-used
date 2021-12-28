import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AffiliateState } from './state'
import { Invitation } from './types'

type AffiliateMutations<S = AffiliateState> = {
  [MutationTypes.SetInvitationList] (state: S, payload: Array<Invitation>): void
}

const mutations: MutationTree<AffiliateState> & AffiliateMutations = {
  [MutationTypes.SetInvitationList] (state: AffiliateState, payload: Array<Invitation>) {
    state.invitations = payload
  }
}

export { AffiliateMutations, mutations }
