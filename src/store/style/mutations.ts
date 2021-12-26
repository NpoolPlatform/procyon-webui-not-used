import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { StyleState } from './state'
import { FontFamily } from './types'

type StyleMutations<S = StyleState> = {
  [MutationTypes.SetFontStyle] (state: S, payload: FontFamily): void
  [MutationTypes.SetShowEmail] (state: S, payload: boolean): void
  [MutationTypes.SetShowPhone] (state: S, payload: boolean): void
}

const mutations: MutationTree<StyleState> & StyleMutations = {
  [MutationTypes.SetFontStyle] (state: StyleState, payload: FontFamily) {
    state.fontStyle = payload
  },
  [MutationTypes.SetShowEmail] (state: StyleState, payload: boolean) {
    state.showEmail = payload
  },
  [MutationTypes.SetShowPhone] (state: StyleState, payload: boolean) {
    state.showPhone = payload
  }
}

export { StyleMutations, mutations }
