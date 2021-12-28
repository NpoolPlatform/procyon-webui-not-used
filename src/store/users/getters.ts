import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { LoginRecord, UserBasicInfo, UserInfo } from './types'

type UserGetters = {
  getUserInfo (state: UserState): UserInfo
  getUserLogined (state: UserState): boolean
  getUserInvitationCode (state: UserState): string
  getLoginVerify (state: UserState): boolean
  getUserBasicInfo (state: UserState): UserBasicInfo
  getUserUsername (state: UserState): string
  getUserGender (state: UserState): string
  getUserFirstName (state: UserState): string
  getUserLastName (state: UserState): string
  getUserPostalCode (state: UserState): string
  getUserProvince (state: UserState): string
  getUserStreetAddress1 (state: UserState): string
  getUserStreetAddress2 (state: UserState): string
  getUserCity (state: UserState): string
  getUserCountry (state: UserState): string
  getUserEmailAddress (state: UserState): string
  getUserPhoneNumber (state: UserState): string
  getUserGoogleAuthenticator (state: UserState): boolean
  getUserGoogleLoginVerify (state: UserState): boolean
  getUserLoginHistory (state: UserState): Array<LoginRecord>
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getUserInfo: (state: UserState): UserInfo => state.info,
  getUserLogined: (state: UserState): boolean => state.logined,
  getUserInvitationCode: (state: UserState): string => state.invitationCode,
  getLoginVerify: (state: UserState): boolean => state.loginVerify,
  getUserBasicInfo: (state: UserState): UserBasicInfo => state.info.UserBasicInfo,
  getUserUsername: (state: UserState): string => state.info.UserBasicInfo.Username,
  getUserGender: (state: UserState): string => state.info.UserBasicInfo.Gender,
  getUserFirstName: (state: UserState): string => state.info.UserBasicInfo.FirstName,
  getUserLastName: (state: UserState): string => state.info.UserBasicInfo.LastName,
  getUserPostalCode: (state: UserState): string => state.info.UserBasicInfo.PostalCode,
  getUserProvince: (state: UserState): string => state.info.UserBasicInfo.Province,
  getUserStreetAddress1: (state: UserState): string => state.info.UserBasicInfo.StreetAddress1,
  getUserStreetAddress2: (state: UserState): string => state.info.UserBasicInfo.StreetAddress2,
  getUserCity: (state: UserState): string => state.info.UserBasicInfo.City,
  getUserCountry: (state: UserState): string => state.info.UserBasicInfo.Country,
  getUserEmailAddress: (state: UserState): string => state.info.UserBasicInfo.EmailAddress,
  getUserPhoneNumber: (state: UserState): string => state.info.UserBasicInfo.PhoneNumber,
  getUserGoogleAuthenticator: (state: UserState): boolean => state.info.UserAppInfo.UserApplicationInfo.GAVerify,
  getUserGoogleLoginVerify: (state: UserState): boolean => state.info.UserAppInfo.UserApplicationInfo.GALogin,
  getUserLoginHistory: (state: UserState): Array<LoginRecord> => state.loginHistory
}

export { UserGetters, getters }
