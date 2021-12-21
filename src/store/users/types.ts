interface UserBaiscInfo {
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
  UserBasicInfo: UserBaiscInfo
  UserAppInfo: UserAppInfo
}

enum UserURLPath {
  LOGIN = '/login-door/v1/login',
  GET_USER_DETAIL = '/user-management/v1/get/user/details',
  UPDATE_USER = '/user-management/v1/update/user',
  LOGOUT = '/login-door/v1/logout',
}

export { UserInfo, UserBaiscInfo, UserRoleInfo, UserURLPath }
