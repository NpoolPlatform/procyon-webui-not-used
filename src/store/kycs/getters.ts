import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { KYCState } from './state'
import { KYC, KYCImage } from './types'

type KYCGetters = {
  getKYCInfo (state: KYCState): KYC
  getKYCFrontImage (state: KYCState): KYCImage
  getKYCBackImage (state: KYCState): KYCImage
  getKYCHandingImage (state: KYCState): KYCImage
}

const getters: GetterTree<KYCState, RootState> & KYCGetters = {
  getKYCInfo: (state: KYCState): KYC => state.KYC,
  getKYCFrontImage: (state: KYCState) => state.FrontImage,
  getKYCBackImage: (state: KYCState) => state.BackImage,
  getKYCHandingImage: (state: KYCState) => state.HandingImage
}

export { KYCGetters, getters }
