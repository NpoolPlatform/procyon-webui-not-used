import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { ApplicationState } from './state'
import { Application } from './types'

type ApplicationGetters = {
  getApplication (state: ApplicationState): Application
}

const getters: GetterTree<ApplicationState, RootState> & ApplicationGetters = {
  getApplication: (state: ApplicationState): Application => state.Application as Application
}

export { ApplicationGetters, getters }
