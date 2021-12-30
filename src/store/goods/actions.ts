import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes as goodsMutation } from './mutation-types'
import { GoodMutations } from './mutations'
import { GoodState } from './state'
import { post } from 'src/boot/axios'
import { GetGoodDetailsRequest, GetGoodDetailsResponse, GoodURLPath } from './types'
import { ItemStateTarget, RequestInput } from 'src/store/types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage } from 'src/utils/utils'

// use public api
interface GoodActions {
  [ActionTypes.GetGoodDetails] ({
    commit
  }: AugmentedActionContext<GoodState,
    RootState,
    GoodMutations<GoodState>>, payload: RequestInput<GetGoodDetailsRequest>): void
}

const actions: ActionTree<GoodState, RootState> = {
  [ActionTypes.GetGoodDetails] ({ commit }, payload: RequestInput<GetGoodDetailsRequest>) {
    commit(notifyMutation.SetInnerLoading, {
      key: ItemStateTarget.GetPromotionProduct,
      value: true
    })
    post<GetGoodDetailsRequest, GetGoodDetailsResponse>(GoodURLPath.GET_GOOD_DETAILS, payload.requestInput)
      .then((resp: GetGoodDetailsResponse) => {
        commit(goodsMutation.SetGoodDetails, resp.Details)
        commit(notifyMutation.SetInnerLoading, {
          key: ItemStateTarget.GetPromotionProduct,
          value: false
        })
      })
      .catch((err: Error) => {
        commit(goodsMutation.SetGoodDetails, [])
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, {
          key: ItemStateTarget.GetPromotionProduct,
          value: false
        })
      })
  }
}

export { actions, GoodActions }
