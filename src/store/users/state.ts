import { LoginHistory, UserInfo } from './types'

interface UserState {
  info: UserInfo
  logined: boolean
  invitationCode: string
  loginVerify: boolean
  loginHistories: Array<LoginHistory>
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
    loginHistories: [],
    loadGoogleRecaptcha: true
  }
}

export { state, UserState }
