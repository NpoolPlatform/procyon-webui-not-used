import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { VerifyState } from './state'
import { GoogleAuthenticationInfo } from 'src/store/verify/types'

type VerifyMutations<S = VerifyState> = {
  [MutationTypes.SetLoginEmailVerifyDialog] (state: S, payload: boolean): void
  [MutationTypes.SetLoginGoogleAuthenticationVerifyDialog] (state: S, payload: boolean): void
  [MutationTypes.SetLoading] (state: S, payload: boolean): void
  [MutationTypes.SetError] (state: S, payload: string): void
  [MutationTypes.SetGoogleAuthenticationInfo] (state: S, payload: GoogleAuthenticationInfo): void
  [MutationTypes.SetSendCodeButtonDisable] (state: S, payload: boolean): void
  [MutationTypes.SetSendCodeButtonText] (state: S, payload: string): void
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
  [MutationTypes.SetGoogleAuthenticationInfo] (state: VerifyState, payload: GoogleAuthenticationInfo) {
    state.googleAuthenticationInfo = payload
  },
  [MutationTypes.SetSendCodeButtonDisable] (state: VerifyState, payload: boolean) {
    state.sendCodeButtonDisable = payload
  },
  [MutationTypes.SetSendCodeButtonText] (state: VerifyState, payload: string) {
    state.sendCodeButtonText = payload
  }
}

export { VerifyMutations, mutations }
