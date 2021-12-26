import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes as goodsMutation } from './mutation-types'
import { GoodMutations } from './mutations'
import { GoodState } from './state'
import { post } from 'src/boot/axios'
import { GetGoodDetailsRequest, GetGoodDetailsResponse, GoodURLPath } from './types'

// use public api
interface GoodActions {
  [ActionTypes.GetGoodDetails] ({
    commit
  }: AugmentedActionContext<GoodState,
    RootState,
    GoodMutations<GoodState>>, payload: GetGoodDetailsRequest): void
}

const actions: ActionTree<GoodState, RootState> = {
  [ActionTypes.GetGoodDetails] ({ commit }, payload: GetGoodDetailsRequest) {
    post<GetGoodDetailsRequest, GetGoodDetailsResponse>(GoodURLPath.GET_GOOD_DETAILS, payload)
      .then((resp: GetGoodDetailsResponse) => {
        commit(goodsMutation.SetGoodDetails, resp.Details)
      })
      .catch(() => {
        commit(goodsMutation.SetGoodDetails, [])
      })
  }
}

export { actions, GoodActions }
