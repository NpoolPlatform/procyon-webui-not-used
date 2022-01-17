import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { KYCMutations } from './mutations'
import { KYCState } from './state'
import { post } from 'src/boot/axios'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage } from 'src/utils/utils'
import { useI18n } from 'boot/i18n'
import { GetKYCResponse } from './types'
import { API } from './const'

// use public api
interface KYCActions {
  [ActionTypes.GetKYCInfo] ({
    commit
  }: AugmentedActionContext<KYCState,
    RootState,
    KYCMutations<KYCState>>): void
}

const actions: ActionTree<KYCState, RootState> = {
  [ActionTypes.GetKYCInfo] ({ commit }) {
    const { t } = useI18n()
    post<unknown, GetKYCResponse>(API.GET_KYC_INFO, {})
      .then((resp: GetKYCResponse) => {
        console.log(resp)
      })
      .catch((err: Error) => {
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('general.GetKYCFail'), err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, {
          key: '',
          value: false
        })
      })
  }
}

export { actions, KYCActions }
