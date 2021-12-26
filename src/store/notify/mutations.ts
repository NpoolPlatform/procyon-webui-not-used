import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { NotifyState } from './state'
import { allMessages } from 'src/store/types'

type NotifyMutations<S = NotifyState> = {
  [MutationTypes.SetLoading] (state: S, payload: boolean): void
  [MutationTypes.PushMessage] (state: S, payload: allMessages): void
  [MutationTypes.SetLoadingMessage] (state: S, payload: string): void
  [MutationTypes.CleanMessages] (state: S): void
}

const mutations: MutationTree<NotifyState> & NotifyMutations = {
  [MutationTypes.SetLoading] (state: NotifyState, payload: boolean) {
    state.loading = payload
  },
  [MutationTypes.PushMessage] (state: NotifyState, payload: allMessages) {
    state.notifyMessages.push(payload)
  },
  [MutationTypes.SetLoadingMessage] (state: NotifyState, payload: string) {
    state.loadingMessage = payload
  },
  [MutationTypes.CleanMessages] (state: NotifyState) {
    state.notifyMessages = []
  }
}

export { NotifyMutations, mutations }
