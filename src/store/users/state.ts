import { UserInfo } from './types'

interface UserState {
  info: UserInfo
  logined: boolean
  error: string
  loading: boolean
  hasInvitationCode: boolean
}

function state (): UserState {
  const info: UserInfo = {
    UserBasicInfo: {
      UserID: '',
      Username: '',
      Password: '',
      Avatar: '',
      Age: 0,
      Gender: '',
      Region: '',
      Birthday: '',
      Country: '',
      Province: '',
      City: '',
      PhoneNumber: '',
      Compony: '',
      EmailAddress: '',
      SignupMethod: '',
      Career: '',
      DisplayName: '',
      FirstName: '',
      LastName: '',
      StreetAddress1: '',
      StreetAddress2: '',
      PostalCode: ''
    },
    UserAppInfo: {
      UserApplicationInfo: {
        ID: '',
        AppID: '',
        UserID: '',
        Original: true,
        KycVerify: false,
        GAVerify: false,
        GALogin: false,
        LoginNumber: 0,
        CreateAT: 0
      },
      UserRoleInfo: {
        UserID: '',
        AppID: '',
        Infos: []
      },
      UserGroupInfo: {
        ID: '',
        GroupID: '',
        AppID: '',
        UserID: '',
        Annotation: '',
        CreateAT: 0
      }
    }
  }
  return {
    info: info,
    logined: true,
    loading: false,
    error: '',
    hasInvitationCode: true
  }
}

export { state, UserState }
