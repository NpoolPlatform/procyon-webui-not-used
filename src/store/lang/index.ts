import { Module } from 'vuex'
import { RootState } from '../index'
import { state, LanguagesState } from './state'
import { LanguageActions, actions } from './actions'
import { LanguageGetters, getters } from './getters'
import { LanguageMutations, mutations } from './mutations'

const languages: Module<LanguagesState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  languages, LanguagesState,
  actions, LanguageActions,
  mutations, LanguageMutations,
  getters, LanguageGetters
}
