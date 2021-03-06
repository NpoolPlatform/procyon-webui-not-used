import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { NotifyState } from './state'
import { InnerLoadingSate, NotifyMessage } from 'src/store/notify/types'

type NotifyMutations<S = NotifyState> = {
  [MutationTypes.SetLoading] (state: S, payload: boolean): void
  [MutationTypes.PushMessage] (state: S, payload: NotifyMessage): void
  [MutationTypes.SetLoadingContent] (state: S, payload: string): void
  [MutationTypes.CleanMessages] (state: S): void
  [MutationTypes.SetInnerLoading] (state: S, payload: InnerLoadingSate): void
}

const mutations: MutationTree<NotifyState> & NotifyMutations = {
  [MutationTypes.SetLoading] (state: NotifyState, payload: boolean) {
    state.loading = payload
  },
  [MutationTypes.PushMessage] (state: NotifyState, payload: NotifyMessage) {
    state.notifyMessages.push(payload)
  },
  [MutationTypes.SetLoadingContent] (state: NotifyState, payload: string) {
    state.loadingContent = payload
  },
  [MutationTypes.CleanMessages] (state: NotifyState) {
    state.notifyMessages = []
  },
  [MutationTypes.SetInnerLoading] (state: NotifyState, payload: InnerLoadingSate) {
    state.innerLoading.set(payload.key, payload.value)
  }
}

export { NotifyMutations, mutations }
