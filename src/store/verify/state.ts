import { GoogleAuthenticationInfo } from 'src/store/verify/types'

interface VerifyState {
  loginEmailVerifyDialog: boolean
  loginGoogleAuthenticationVerifyDialog: boolean
  loading: boolean
  error: string
  googleAuthenticationInfo: GoogleAuthenticationInfo
  sendCodeButtonDisable: boolean
  sendCodeButtonText: string
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
    sendCodeButtonDisable: false,
    sendCodeButtonText: ''
  }
}

export { state, VerifyState }
