import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { KYCState } from './state'
import { KYC, KYCImage } from './types'

type KYCMutations<S = KYCState> = {
  [MutationTypes.SetKYCInfo] (state: S, payload: KYC): void
  [MutationTypes.SetKYCFrontImage] (state: S, payload: KYCImage): void
  [MutationTypes.SetKYCBackImage] (state: S, payload: KYCImage): void
  [MutationTypes.SetKYCHandingImage] (state: S, payload: KYCImage): void
}

const mutations: MutationTree<KYCState> & KYCMutations = {
  [MutationTypes.SetKYCInfo] (state: KYCState, payload: KYC) {
    state.KYC = payload
  },
  [MutationTypes.SetKYCFrontImage] (state: KYCState, payload: KYCImage) {
    state.FrontImage = payload
  },
  [MutationTypes.SetKYCBackImage] (state: KYCState, payload: KYCImage) {
    state.BackImage = payload
  },
  [MutationTypes.SetKYCHandingImage] (state: KYCState, payload: KYCImage) {
    state.HandingImage = payload
  }
}

export { KYCMutations, mutations }
