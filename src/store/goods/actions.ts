import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes as goodsMutation } from './mutation-types'
import { GoodMutations } from './mutations'
import { GoodState } from './state'
import { post } from 'src/boot/axios'
import { GetGoodDetailsRequest, GetGoodDetailsResponse, GoodURLPath } from './types'
import { ItemStateTarget } from 'src/store/types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage } from 'src/utils/utils'
import { useI18n } from 'boot/i18n'

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
    const { t } = useI18n()
    commit(notifyMutation.SetInnerLoading, {
      key: ItemStateTarget.GetPromotionProduct,
      value: true
    })
    post<GetGoodDetailsRequest, GetGoodDetailsResponse>(GoodURLPath.GET_GOOD_DETAILS, payload)
      .then((resp: GetGoodDetailsResponse) => {
        commit(goodsMutation.SetGoodDetails, resp.Details)
        commit(notifyMutation.SetInnerLoading, {
          key: ItemStateTarget.GetPromotionProduct,
          value: false
        })
      })
      .catch((err: Error) => {
        commit(goodsMutation.SetGoodDetails, [])
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.GetPromotionGoods.Fail'), err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, {
          key: ItemStateTarget.GetPromotionProduct,
          value: false
        })
      })
  }
}

export { actions, GoodActions }
