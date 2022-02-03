import { GoogleAuthenticationInfo } from 'src/store/verify/types'

interface VerifyState {
  loginEmailVerifyDialog: boolean
  loginGoogleAuthenticationVerifyDialog: boolean
  loading: boolean
  error: string
  googleAuthenticationInfo: GoogleAuthenticationInfo
  sendCodeButtonDisable: Map<string, boolean>
  sendCodeButtonText: Map<string, string>
  verifyMethod: string
}

function state (): VerifyState {
  return {
    loginEmailVerifyDialog: false,
    loginGoogleAuthenticationVerifyDialog: false,
    loading: false,
    error: '',
    googleAuthenticationInfo: {},
    sendCodeButtonDisable: new Map<string, boolean>(),
    sendCodeButtonText: new Map<string, string>(),
    verifyMethod: 'unknown-verification'
  }
}

export { state, VerifyState }
