import { FontFamily } from './types'
import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { StyleState } from './state'

type StyleGetters = {
  getFontStyle (state: StyleState): FontFamily
  getShowEmail (state: StyleState): boolean
  getShowPhone (state: StyleState): boolean
  getUserDialogShow (state: StyleState): boolean
}

const getters: GetterTree<StyleState, RootState> & StyleGetters = {
  getFontStyle: (state: StyleState): FontFamily => state.fontStyle,
  getShowEmail: (state: StyleState): boolean => state.showEmail,
  getShowPhone: (state: StyleState): boolean => state.showPhone,
  getUserDialogShow: (state: StyleState): boolean => state.userDialogShow
}

export { StyleGetters, getters }
