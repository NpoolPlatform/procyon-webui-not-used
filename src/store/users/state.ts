import { LoginRecord, NilUserInfo, UserInfo } from './types'

interface UserState {
  info: UserInfo
  logined: boolean
  invitationCode: string
  loginVerify: boolean
  loginHistory: Array<LoginRecord>
}

function state (): UserState {
  const info: UserInfo = NilUserInfo
  return {
    info: info,
    logined: false,
    invitationCode: '',
    loginVerify: false,
    loginHistory: []
  }
}

export { state, UserState }
