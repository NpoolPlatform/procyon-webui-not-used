import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { VerifyState } from './state'
import { DisableState, GoogleAuthenticationInfo, TextState } from 'src/store/verify/types'

type VerifyMutations<S = VerifyState> = {
  [MutationTypes.SetLoginEmailVerifyDialog] (state: S, payload: boolean): void
  [MutationTypes.SetLoginGoogleAuthenticationVerifyDialog] (state: S, payload: boolean): void
  [MutationTypes.SetLoading] (state: S, payload: boolean): void
  [MutationTypes.SetError] (state: S, payload: string): void
  [MutationTypes.SetGoogleAuthenticationInfo] (state: S, payload: GoogleAuthenticationInfo): void
  [MutationTypes.SetDisable] (state: S, payload: DisableState): void
  [MutationTypes.SetSendCodeButtonText] (state: S, payload: TextState): void
  [MutationTypes.SetVerifyMethod] (state: S, payload: string): void
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
  [MutationTypes.SetDisable] (state: VerifyState, payload: DisableState) {
    state.sendCodeButtonDisable.set(payload.key, payload.value)
  },
  [MutationTypes.SetSendCodeButtonText] (state: VerifyState, payload: TextState) {
    state.sendCodeButtonText.set(payload.key, payload.value)
  },
  [MutationTypes.SetVerifyMethod] (state: VerifyState, payload: string) {
    state.verifyMethod = payload
  }
}

export { VerifyMutations, mutations }
