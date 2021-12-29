import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { VerifyState } from './state'
import { GoogleAuthenticationInfo } from 'src/store/verify/types'

type VerifyGetters = {
  getLoginEmailVerifyDialog (state: VerifyState): boolean
  getLoginGoogleAuthenticationVerifyDialog (state: VerifyState): boolean
  getVerifyLoading (state: VerifyState): boolean
  getVerifyError (state: VerifyState): string
  getVerifySendCodeButtonDisable (state: VerifyState): boolean
  getVerifySendCodeButtonText (state: VerifyState): string
  getGoogleAuthenticationInfo (state: VerifyState): GoogleAuthenticationInfo
}

const getters: GetterTree<VerifyState, RootState> & VerifyGetters = {
  getLoginEmailVerifyDialog: (state: VerifyState): boolean => state.loginEmailVerifyDialog,
  getLoginGoogleAuthenticationVerifyDialog: (state: VerifyState): boolean => state.loginGoogleAuthenticationVerifyDialog,
  getVerifyLoading: (state: VerifyState): boolean => state.loading,
  getVerifyError: (state: VerifyState): string => state.error,
  getVerifySendCodeButtonDisable: (state: VerifyState): boolean => state.sendCodeButtonDisable,
  getVerifySendCodeButtonText: (state: VerifyState): string => state.sendCodeButtonText,
  getGoogleAuthenticationInfo: (state: VerifyState): GoogleAuthenticationInfo => state.googleAuthenticationInfo
}

export { VerifyGetters, getters }
