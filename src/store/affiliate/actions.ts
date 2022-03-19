import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { AffiliateMutations } from './mutations'
import { AffiliateState } from './state'
import {
  AffiliateURLPath,
  GetReferralsRequest,
  GetReferralsResponse
} from './types'
import { doAction } from '../action'

// use public api
interface AffiliateActions {
  [ActionTypes.GetReferrals] ({
    commit, rootState
  }: AugmentedActionContext<AffiliateState,
    RootState,
    AffiliateMutations<AffiliateState>>, req: GetReferralsRequest): void
}

const actions: ActionTree<AffiliateState, RootState> = {
  [ActionTypes.GetReferrals] ({ commit }, req: GetReferralsRequest) {
    doAction<GetReferralsRequest, GetReferralsResponse>(
      commit,
      AffiliateURLPath.GET_REFERRALS,
      req,
      req.Message,
      (resp: GetReferralsResponse): void => {
        commit(MutationTypes.SetReferrals, resp.Infos)
      })
  }
}

export { actions, AffiliateActions }
