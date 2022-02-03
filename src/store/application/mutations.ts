import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { ApplicationState } from './state'
import { Application } from './types'

type ApplicationMutations<S = ApplicationState> = {
  [MutationTypes.SetApplication] (state: S, payload: Application): void
}

const mutations: MutationTree<ApplicationState> & ApplicationMutations = {
  [MutationTypes.SetApplication] (state: ApplicationState, payload: Application) {
    state.Application = payload
  }
}

export { ApplicationMutations, mutations }
