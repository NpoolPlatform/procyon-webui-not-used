import { State } from './const'
import { KYC, KYCImage } from './types'

interface KYCState {
  KYC: KYC,
  FrontImage: KYCImage,
  BackImage: KYCImage,
  HandingImage: KYCImage
}

function state (): KYCState {
  return {
    KYC: {
      State: State.NotVerified
    },
    FrontImage: {},
    BackImage: {},
    HandingImage: {}
  }
}

export { state, KYCState }
