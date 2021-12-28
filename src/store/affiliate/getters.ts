import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AffiliateState } from './state'
import { Invitation } from './types'

type AffiliateGetters = {
  getInvitationList (state: AffiliateState): Array<Invitation>
}

const getters: GetterTree<AffiliateState, RootState> & AffiliateGetters = {
  getInvitationList: (state: AffiliateState): Array<Invitation> => state.invitations
}

export { AffiliateGetters, getters }
