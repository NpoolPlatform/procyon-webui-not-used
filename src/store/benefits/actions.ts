import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { BenefitsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { BenefitMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { GetBenefitsRequest, GetBenefitsResponse } from './types'

interface BenefitActions {
  [ActionTypes.GetUserBenefitsByAppUser]({
    commit
  }: AugmentedActionContext<
    BenefitsState,
    RootState,
    BenefitMutations<BenefitsState>>,
    req: GetBenefitsRequest): void
}

const actions: ActionTree<BenefitsState, RootState> = {
  [ActionTypes.GetUserBenefitsByAppUser] ({ commit }, req: GetBenefitsRequest) {
    doAction<GetBenefitsRequest, GetBenefitsResponse>(
      commit,
      API.GET_USER_BENEFITS_BY_APP_USER,
      req,
      req.Message,
      (resp: GetBenefitsResponse): void => {
        commit(MutationTypes.SetBenefits, resp.Infos)
      })
  }
}

export {
  actions,
  BenefitActions
}
