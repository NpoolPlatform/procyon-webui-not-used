import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { StyleState } from './state'
import { FontFamily } from './types'

type StyleMutations<S = StyleState> = {
  [MutationTypes.SetFontStyle](state: S, payload: FontFamily): void
}

const mutations: MutationTree<StyleState> & StyleMutations = {
  [MutationTypes.SetFontStyle] (state: StyleState, payload: FontFamily) {
    state.fonstStyle = payload
  }
}

export { StyleMutations, mutations }
