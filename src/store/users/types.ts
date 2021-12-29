interface UserBasicInfo {
  UserID?: string
  Username: string
  Password: string
  Avatar?: string
  Age?: number
  Gender: string
  Region?: string
  Birthday?: string
  Country: string
  Province: string
  City: string
  PhoneNumber: string
  Compony?: string
  EmailAddress: string
  SignupMethod?: string
  Career?: string
  DisplayName?: string
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

interface UserSignUpRequest {
  Username?: string,
  Password: string
  EmailAddress?: string
  PhoneNumber?: string
  VerificationCode: string
  AppID?: string
  InvitationCode: string
}

interface UserSignUpResponse {
  Info: UserBasicInfo
}

interface UserChangePasswordRequest {
  UserID?: string
  AppID?: string
  VerifyParam: string
  VerifyType: string
  OldPassword: string
  Password: string
  Code: string
}

interface UserChangePasswordResponse {
  Info: string
}

interface UserForgetPasswordRequest {
  VerifyParam: string
  VerifyType: string
  Password: string
  Code: string
  AppID?: string
}

interface UserForgetPasswordResponse {
  Info: string
}

interface GetUserDetailRequest {
  AppID?: string
  UserID?: string
}

interface GetUserDetailResponse {
  Info: UserInfo
}

interface UpdateUserRequest {
  Info: UserBasicInfo
  UserID?: string
  AppID?: string
}

interface UpdateUserResponse {
  Info: UserBasicInfo
}

interface LoginRecord {
  ID: string
  UserID: string
  AppID: string
  LoginTime: number
  IP: string
  Location: string
  Lat: number
  Lon: number
  Timezone: string
}

interface GetUserLoginHistoryRequest {
  UserID?: string
  AppID?: string
}

interface GetUserLoginHistoryResponse {
  Infos: Array<LoginRecord>
}

interface SetGALoginVerifyRequest {
  AppID?: string
  UserID?: string
  Set: boolean
}

interface SetGaLoginVerifyResponse {
  Info: string
}

interface UpdateUserGAStatusRequest {
  UserID?: string
  AppID?: string
  Status: boolean
}

interface UpdateUserGAStatusResponse {
  Info: string
}

interface EnableEmailRequest {
  UserID?: string
  EmailAddress: string
  Code: string
  AppID?: string
}

interface EnableEmailResponse {
  Info: string
}

interface EnablePhoneRequest {
  UserID?: string
  AppID?: string
  PhoneNumber: string
  Code: string
}

interface EnablePhoneResponse {
  Info: string
}

interface UpdateEmailRequest {
  OldEmail: string
  OldCode: string
  NewEmail: string
  NewCode: string
  AppID?: string
  UserID?: string
}

interface UpdateEmailResponse {
  Info: string
}

interface UpdatePhoneRequest {
  OldPhone: string
  OldCode: string
  NewPhone: string
  NewCode: string
  UserID?: string
  AppID?: string
}

interface UpdatePhoneResponse {
  Info: string
}

enum UserURLPath {
  LOGIN = '/login-door/v1/login',
  LOGOUT = '/login-door/v1/logout',
  GET_USER_INVITATION_CODE = '/cloud-hashing-inspire/v1/get/user/invitation/code/by/app/user',
  SIGN_UP = '/cloud-hashing-apis/v1/signup',
  CHANGE_PASSWORD = '/user-management/v1/change/password',
  FORGET_PASSWORD = '/user-management/v1/forget/password',
  GET_USER_DETAIL = '/user-management/v1/get/user/details',
  UPDATE_USER = '/user-management/v1/update/user',
  GET_USER_LOGIN_HISTORY = '/login-door/v1/get/user/login/records',
  SET_GA_LOGIN_VERIFY = '/application-management/v1/set/ga/login',
  UPDATE_USER_GA_STATUS = '/application-management/v1/update/user/ga/status',
  ENABLE_EMAIL = '/user-management/v1/bind/email',
  ENABLE_PHONE = '/user-management/v1/bind/phone',
  UPDATE_EMAIL = '/user-management/v1/update/user/email',
  UPDATE_PHONE = '/user-management/v1/update/user/phone'
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
  GetUserInvitationCodeResponse,
  UserSignUpRequest,
  UserSignUpResponse,
  UserChangePasswordRequest,
  UserChangePasswordResponse,
  UserForgetPasswordRequest,
  UserForgetPasswordResponse,
  GetUserDetailRequest,
  GetUserDetailResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  GetUserLoginHistoryRequest,
  GetUserLoginHistoryResponse,
  SetGALoginVerifyRequest,
  SetGaLoginVerifyResponse,
  UpdateUserGAStatusRequest,
  UpdateUserGAStatusResponse,
  EnableEmailRequest,
  EnableEmailResponse,
  EnablePhoneRequest,
  EnablePhoneResponse,
  UpdateEmailRequest,
  UpdateEmailResponse,
  UpdatePhoneRequest,
  UpdatePhoneResponse,
  LoginRecord
}
