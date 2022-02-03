import { LoginRecord, UserInfo } from './types'

interface UserState {
  info: UserInfo
  logined: boolean
  invitationCode: string
  loginVerify: boolean
  loginHistory: Array<LoginRecord>
  loadGoogleRecaptcha: boolean
}

function state (): UserState {
  return {
    info: {
      User: {},
      Extra: {},
      Ctrl: {}
    },
    logined: false,
    invitationCode: '',
    loginVerify: false,
    loginHistory: [],
    loadGoogleRecaptcha: true
  }
}

export { state, UserState }
