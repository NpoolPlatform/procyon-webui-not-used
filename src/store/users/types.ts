import { ReqMessage } from '../notifications/types'

interface AppUser {
  ID?: string
  AppID?: string
  EmailAddress?: string
  PhoneNO?: string
  ImportedFromApp?: string
  CreateAt?: number
}

interface AppRole {
  ID: string
  AppID: string
  CreatedBy: string
  Role: string
  Description: string
  Default: boolean
}

interface AppUserExtra {
  ID?: string
  AppID?: string
  UserID?: string
  Username?: string
  FirstName?: string
  LastName?: string
  AddressFields?: Array<string>
  Gender?: string
  PostalCode?: string
  Age?: number
  Birthday?: number
  Avatar?: string
  Organization?: string
}

interface AppUserControl {
  ID?: string
  AppID?: string
  UserID?: string
  SigninVerifyByGoogleAuthentication?: boolean
}

interface BanAppUser {
  ID: string
  AppID: string
  UserID: string
  Message: string
}

interface UserInfo {
  User: AppUser
  Extra: AppUserExtra
  Ctrl: AppUserControl
  Ban?: BanAppUser
  Roles?: Array<AppRole>
}

interface UserLoginRequest {
  Account: string
  PasswordHash: string
  AccountType: string
  // google recaptcha response
  GoogleRecaptchaResponse?: string
}

interface UserLoginResponse {
  Info: UserInfo
  Token: string
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
  PasswordHash: string
  Account: string
  AccountType: string
  VerificationCode: string
  AppID?: string
  InvitationCode: string
}

interface UserSignUpResponse {
  Info: AppUser
}

interface UserUpdatePasswordByAppUserRequest {
  Account: string
  AccountType: string
  OldPasswordHash: string
  PasswordHash: string
  VerificationCode : string
}

interface UserUpdatePasswordByAppUserResponse {
  Info: string
}

interface UserUpdatePasswordRequest {
  Account: string
  AccountType: string
  PasswordHash: string
  VerificationCode : string
}

interface UserUpdatePasswordResponse {
  Info: string
}

interface GetAppUserInfoRequest {
  ID: string
  Message: ReqMessage
}

interface GetAppUserInfoResponse {
  Info: UserInfo
}

interface UpdateUserRequest {
  Info: UserInfo
}

interface UpdateUserResponse {
  Info: UserInfo
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
  LOGIN = '/login-gateway/v1/login',
  LOGOUT = '/login-gateway/v1/logout',
  GET_USER_INVITATION_CODE = '/cloud-hashing-inspire/v1/get/user/invitation/code/by/app/user',
  SIGN_UP = '/cloud-hashing-apis-v2/v1/signup',
  UPDATE_PASSWORD_BY_APP_USER = '/cloud-hashing-apis-v2/v1/update/password/by/app/user',
  UPDATE_PASSWORD = '/cloud-hashing-apis-v2/v1/update/password',
  GET_APP_USER_INFO = '/appuser-manager/v1/get/app/userinfo',
  UPDATE_USER = '/appuser-manager/v1/update/user',
  GET_USER_LOGIN_HISTORY = '/login-gateway/v1/get/login/histories',
  SET_GA_LOGIN_VERIFY = '/appuser-manager/v1/set/ga/login',
  UPDATE_USER_GA_STATUS = '/appuser-manager/v1/update/user/ga/status',
  ENABLE_EMAIL = '/appuser-manager/v1/bind/email',
  ENABLE_PHONE = '/appuser-manager/v1/bind/phone',
  UPDATE_EMAIL = '/appuser-manager/v1/update/user/email',
  UPDATE_PHONE = '/appuser-manager/v1/update/user/phone'
}

export {
  UserInfo,
  UserURLPath,
  UserLoginRequest,
  UserLoginResponse,
  UserLogoutRequest,
  UserLogoutResponse,
  GetUserInvitationCodeRequest,
  GetUserInvitationCodeResponse,
  UserSignUpRequest,
  UserSignUpResponse,
  UserUpdatePasswordByAppUserRequest,
  UserUpdatePasswordByAppUserResponse,
  UserUpdatePasswordRequest,
  UserUpdatePasswordResponse,
  GetAppUserInfoRequest,
  GetAppUserInfoResponse,
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
