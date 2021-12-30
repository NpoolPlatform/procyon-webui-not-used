import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { VerifyState } from './state'
import { GoogleAuthenticationInfo } from 'src/store/verify/types'

type VerifyGetters = {
  getLoginEmailVerifyDialog (state: VerifyState): boolean
  getLoginGoogleAuthenticationVerifyDialog (state: VerifyState): boolean
  getVerifyLoading (state: VerifyState): boolean
  getVerifyError (state: VerifyState): string
  getVerifyDisable (state: VerifyState): Map<string, boolean>
  getVerifySendCodeButtonText (state: VerifyState): Map<string, string>
  getGoogleAuthenticationInfo (state: VerifyState): GoogleAuthenticationInfo
}

const getters: GetterTree<VerifyState, RootState> & VerifyGetters = {
  getLoginEmailVerifyDialog: (state: VerifyState): boolean => state.loginEmailVerifyDialog,
  getLoginGoogleAuthenticationVerifyDialog: (state: VerifyState): boolean => state.loginGoogleAuthenticationVerifyDialog,
  getVerifyLoading: (state: VerifyState): boolean => state.loading,
  getVerifyError: (state: VerifyState): string => state.error,
  getVerifyDisable: (state: VerifyState): Map<string, boolean> => state.sendCodeButtonDisable,
  getVerifySendCodeButtonText: (state: VerifyState): Map<string, string> => state.sendCodeButtonText,
  getGoogleAuthenticationInfo: (state: VerifyState): GoogleAuthenticationInfo => state.googleAuthenticationInfo
}

export { VerifyGetters, getters }
