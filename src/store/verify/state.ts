import { googleAuthenticationInfo } from 'src/store/verify/types'

interface VerifyState {
  loginEmailVerifyDialog: boolean
  loginGoogleAuthenticationVerifyDialog: boolean
  loading: boolean
  error: string
  googleAuthenticationInfo: googleAuthenticationInfo
  sendCodeButtonDisable: boolean
  sendCodeButtonText: string
}

function state (): VerifyState {
  const info: googleAuthenticationInfo = {
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
