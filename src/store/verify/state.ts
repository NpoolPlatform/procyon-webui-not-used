import { GoogleAuthenticationInfo } from 'src/store/verify/types'

interface VerifyState {
  loginEmailVerifyDialog: boolean
  loginGoogleAuthenticationVerifyDialog: boolean
  loading: boolean
  error: string
  googleAuthenticationInfo: GoogleAuthenticationInfo
  sendCodeButtonDisable: Map<string, boolean>
  sendCodeButtonText: Map<string, string>
}

function state (): VerifyState {
  const info: GoogleAuthenticationInfo = {
    qrCodeURL: '',
    secret: ''
  }
  return {
    loginEmailVerifyDialog: false,
    loginGoogleAuthenticationVerifyDialog: false,
    loading: false,
    error: '',
    googleAuthenticationInfo: info,
    sendCodeButtonDisable: new Map<string, boolean>(),
    sendCodeButtonText: new Map<string, string>()
  }
}

export { state, VerifyState }
