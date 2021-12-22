import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { GoodMutations } from './mutations'
import { GoodState } from './state'
import { post } from 'src/boot/axios'
import { GetGoodDetailsResponse, GoodURLPath } from './types'

// use public api
interface GoodActions {
  [ActionTypes.GetGoodDetails]({
    commit
  }: AugmentedActionContext<
    GoodState,
    RootState,
    GoodMutations<GoodState>
  >): void
}

const actions: ActionTree<GoodState, RootState> = {
  [ActionTypes.GetGoodDetails] ({ commit }) {
    commit(MutationTypes.SetLoading, true)
    post<unknown, GetGoodDetailsResponse>(GoodURLPath.GET_GOOD_DETAILS, {})
      .then((resp: GetGoodDetailsResponse) => {
        commit(MutationTypes.SetError, '')
        commit(MutationTypes.SetLoading, false)
        commit(MutationTypes.SetGoodDetails, resp.Details)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetError, err)
        commit(MutationTypes.SetLoading, false)
      })
  }
}

export { actions, GoodActions }
