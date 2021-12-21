import { FontFamily } from './types'
import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { StyleState } from './state'

type StyleGetters = {
  getFontStyle(state: StyleState): FontFamily
}

const getters: GetterTree<StyleState, RootState> & StyleGetters = {
  getFontStyle: (state: StyleState): FontFamily => state.fontStyle
}

export { StyleGetters, getters }
