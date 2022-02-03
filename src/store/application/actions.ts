import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { GetApplicationRequest, GetApplicationResponse } from './types'
import { ApplicationState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ApplicationMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface ApplicationActions {
  [ActionTypes.GetApplication]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: GetApplicationRequest): void
}

const actions: ActionTree<ApplicationState, RootState> = {
  [ActionTypes.GetApplication] ({ commit }, req: GetApplicationRequest) {
    doAction<GetApplicationRequest, GetApplicationResponse>(
      commit,
      API.GET_APPLICATION,
      req,
      req.Message,
      (resp: GetApplicationResponse): void => {
        commit(MutationTypes.SetApplication, resp.Info)
      })
  }
}

export {
  actions,
  ApplicationActions
}
