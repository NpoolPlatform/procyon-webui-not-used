import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { VerifyState } from './state'
import { googleAuthenticationInfo } from 'src/store/verify/types'

type VerifyMutations<S = VerifyState> = {
  [MutationTypes.SetLoginEmailVerifyDialog] (state: S, payload: boolean): void
  [MutationTypes.SetLoginGoogleAuthenticationVerifyDialog] (state: S, payload: boolean): void
  [MutationTypes.SetLoading] (state: S, payload: boolean): void
  [MutationTypes.SetError] (state: S, payload: string): void
  [MutationTypes.SetGoogleAuthenticationInfo] (state: S, payload: googleAuthenticationInfo): void
}

const mutations: MutationTree<VerifyState> & VerifyMutations = {
  [MutationTypes.SetLoginEmailVerifyDialog] (state: VerifyState, payload: boolean) {
    state.loginEmailVerifyDialog = payload
  },
  [MutationTypes.SetLoginGoogleAuthenticationVerifyDialog] (state: VerifyState, payload: boolean) {
    state.loginGoogleAuthenticationVerifyDialog = payload
  },
  [MutationTypes.SetLoading] (state: VerifyState, payload: boolean) {
    state.loading = payload
  },
  [MutationTypes.SetError] (state: VerifyState, payload: string) {
    state.error = payload
  },
  [MutationTypes.SetGoogleAuthenticationInfo] (state: VerifyState, payload: googleAuthenticationInfo) {
    state.googleAuthenticationInfo = payload
  }
}

export { VerifyMutations, mutations }
