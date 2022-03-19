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
  GoogleAuthenticationVerified?: boolean
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
  ManMachineSpec: string
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

interface UpdateUserExtraRequest {
  Info: AppUserExtra
}

interface UpdateUserExtraResponse {
  Info: AppUserExtra
}

interface CreateUserExtraRequest {
  Info: AppUserExtra
}

interface CreateUserExtraResponse {
  Info: AppUserExtra
}

interface LoginHistory {
  ID: string
  AppID: string
  UserID: string
  ClientIP: string
  CreateAt: number
  Location: string
}

interface GetUserLoginHistoryRequest {
  Message: ReqMessage
}

interface GetUserLoginHistoryResponse {
  Infos: Array<LoginHistory>
}

interface SetGALoginVerifyRequest {
  Info: AppUserControl
}

interface SetGaLoginVerifyResponse {
  Info: AppUserControl
}

interface UpdateUserGAStatusRequest {
  UserID?: string
  AppID?: string
  Status: boolean
}

interface UpdateUserGAStatusResponse {
  Info: string
}

interface UpdateEmailRequest {
  OldVerificationCode: string
  OldAccount: string
  OldAccountType: string
  NewEmailAddress: string
  NewEmailVerificationCode: string
}

interface UpdateEmailResponse {
  Info: UserInfo
}

interface UpdatePhoneRequest {
  OldVerificationCode: string
  OldAccount: string
  OldAccountType: string
  NewPhoneNO: string
  NewPhoneVerificationCode: string
}

interface UpdatePhoneResponse {
  Info: UserInfo
}

interface LoginedResponse {
  Info: UserInfo
}

enum UserURLPath {
  LOGIN = '/login-gateway/v1/login',
  LOGOUT = '/login-gateway/v1/logout',
  LOGINED = '/login-gateway/v1/logined',
  GET_USER_INVITATION_CODE = '/cloud-hashing-inspire/v1/get/user/invitation/code/by/app/user',
  SIGN_UP = '/cloud-hashing-apis-v2/v1/signup',
  UPDATE_PASSWORD_BY_APP_USER = '/cloud-hashing-apis-v2/v1/update/password/by/app/user',
  UPDATE_PASSWORD = '/cloud-hashing-apis-v2/v1/update/password',
  GET_APP_USER_INFO = '/appuser-manager/v1/get/app/userinfo',
  UPDATE_APP_USER_EXTRA = '/appuser-manager/v1/update/app/user/extra',
  CREATE_APP_USER_EXTRA = '/appuser-manager/v1/create/app/user/extra',
  GET_USER_LOGIN_HISTORY = '/login-gateway/v1/get/login/histories',
  UPDATE_APP_USER_CONTROL = '/appuser-manager/v1/update/app/user/control',
  CREATE_APP_USER_CONTROL = '/appuser-manager/v1/create/app/user/control',
  UPDATE_EMAIL = '/cloud-hashing-apis-v2/v1/update/emailaddress',
  UPDATE_PHONE = '/cloud-hashing-apis-v2/v1/update/phoneno'
}

export {
  AppUser,
  UserInfo,
  AppUserControl,
  AppUserExtra,
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
  UpdateUserExtraRequest,
  UpdateUserExtraResponse,
  CreateUserExtraRequest,
  CreateUserExtraResponse,
  GetUserLoginHistoryRequest,
  GetUserLoginHistoryResponse,
  SetGALoginVerifyRequest,
  SetGaLoginVerifyResponse,
  UpdateUserGAStatusRequest,
  UpdateUserGAStatusResponse,
  UpdateEmailRequest,
  UpdateEmailResponse,
  UpdatePhoneRequest,
  UpdatePhoneResponse,
  LoginHistory,
  LoginedResponse
}
