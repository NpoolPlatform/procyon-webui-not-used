import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { BenefitsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { BenefitMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { GetBenefitsRequest, GetBenefitsResponse, GetCommissionRequest, GetCommissionResponse } from './types'

interface BenefitActions {
  [ActionTypes.GetUserBenefitsByAppUser]({
    commit
  }: AugmentedActionContext<
    BenefitsState,
    RootState,
    BenefitMutations<BenefitsState>>,
    req: GetBenefitsRequest): void

  [ActionTypes.GetCommissionByAppUser]({
    commit
  }: AugmentedActionContext<
    BenefitsState,
    RootState,
    BenefitMutations<BenefitsState>>,
    req: GetCommissionRequest): void
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
  },

  [ActionTypes.GetCommissionByAppUser] ({ commit }, req: GetCommissionRequest) {
    doAction<GetCommissionRequest, GetCommissionResponse>(
      commit,
      API.GET_COMMISSION_BY_APP_USER,
      req,
      req.Message,
      (resp: GetCommissionResponse): void => {
        commit(MutationTypes.SetCommission, resp.Info)
      })
  }
}

export {
  actions,
  BenefitActions
}
