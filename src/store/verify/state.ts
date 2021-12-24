interface VerifyState {
  loginEmailVerifyDialog: boolean
  loginGoogleAuthenticationVerifyDialog: boolean
  loading: boolean
  error: string
  googleAuthenticationInfo: {
    qrcodeURL: string
    secret: string
  }
}

function state (): VerifyState {
  return {
    loginEmailVerifyDialog: false,
    loginGoogleAuthenticationVerifyDialog: false,
    loading: false,
    error: '',
    googleAuthenticationInfo: {
      qrcodeURL: '',
      secret: ''
    }
  }
}

export { state, VerifyState }
