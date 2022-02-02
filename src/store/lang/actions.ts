import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { LanguagesState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { LanguageMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { GetLanguagesRequest, GetLanguagesResponse } from './types'

interface LanguageActions {
  [ActionTypes.GetAppLangInfos]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: GetLanguagesRequest): void
}

const actions: ActionTree<LanguagesState, RootState> = {
  [ActionTypes.GetAppLangInfos] ({ commit }, req: GetLanguagesRequest) {
    doAction<GetLanguagesRequest, GetLanguagesResponse>(
      commit,
      API.GET_APP_LANG_INFOS_BY_APP,
      req,
      req.Message,
      (resp: GetLanguagesResponse): void => {
        commit(MutationTypes.SetAppLangInfos, resp.Infos)
      })
  }
}

export {
  actions,
  LanguageActions
}
