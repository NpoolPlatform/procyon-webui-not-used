interface UserBasicInfo {
  UserID: string
  Username: string
  Password: string
  Avatar: string
  Age: number
  Gender: string
  Region: string
  Birthday: string
  Country: string
  Province: string
  City: string
  PhoneNumber: string
  Compony: string
  EmailAddress: string
  SignupMethod: string
  Career: string
  DisplayName: string
  FirstName: string
  LastName: string
  StreetAddress1: string
  StreetAddress2: string
  PostalCode: string
}

interface UserApplicationInfo {
  ID: string
  AppID: string
  UserID: string
  Original: boolean
  KycVerify: boolean
  GAVerify: boolean
  GALogin: boolean
  LoginNumber: number
  CreateAT: number
}

interface UserGroupInfo {
  ID: string
  GroupID: string
  AppID: string
  UserID: string
  Annotation: string
  CreateAT: number
}

interface UserRoleInfo {
  ID: string
  AppID: string
  RoleName: string
  Creator: string
  CreateAT: number
  UpdateAT: number
  Annotation: string
}

interface UserRoleInfos {
  UserID: string
  AppID: string
  Infos: Array<UserRoleInfo>
}

interface UserAppInfo {
  UserApplicationInfo: UserApplicationInfo
  UserGroupInfo: UserGroupInfo
  UserRoleInfo: UserRoleInfos
}

interface UserInfo {
  UserBasicInfo: UserBasicInfo
  UserAppInfo: UserAppInfo
}

interface UserLoginRequest {
  AppID?: string
  Username?: string
  Password: string
  Email?: string
  Phone?: string
  // email or phone verify code
  VerifyCode?: string
  // google recaptcha response
  GoogleRecaptchaResponse?: string
  // Provider id
  Provider?: string
  // code is returned by provider after user authenticate from provider
  Code?: string
  // state is returned by provider after user authenticate from provider
  State?: string
  // redirect url tell provider which callback it need to return after get user info
  RedirectURL?: string
  Method?: string
}

interface UserLoginResponse {
  Info: UserInfo
  RedirectURL?: string
}

interface UserLogoutRequest {
  AppSession?: string
  UserID?: string
  AppID?: string
}

interface UserLogoutResponse {
  Info: string
}

interface GetUserInvitationCodeRequest {
  AppID?: string
  UserID?: string
}

interface GetUserInvitationCodeResponse {
  Info: {
    ID: string,
    UserID: string,
    AppID: string,
    InvitationCode: string
  }
}

enum UserURLPath {
  LOGIN = '/login-door/v1/login',
  GET_USER_DETAIL = '/user-management/v1/get/user/details',
  UPDATE_USER = '/user-management/v1/update/user',
  LOGOUT = '/login-door/v1/logout',
  GET_USER_INVITATION_CODE = '/cloud-hashing-inspire/v1/get/user/invitation/code/by/app/user'
}

export {
  UserInfo,
  UserBasicInfo,
  UserRoleInfo,
  UserURLPath,
  UserLoginRequest,
  UserLoginResponse,
  UserLogoutRequest,
  UserLogoutResponse,
  GetUserInvitationCodeRequest,
  GetUserInvitationCodeResponse
}
