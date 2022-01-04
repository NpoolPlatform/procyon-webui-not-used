import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { UserState } from './state'
import { LoginRecord, NilUserInfo, UserBasicInfo, UserInfo } from './types'

type UserMutations<S = UserState> = {
  [MutationTypes.SetUserInfo] (state: S, payload: UserInfo): void
  [MutationTypes.SetUserLogined] (state: S, payload: boolean): void
  [MutationTypes.SetUserBasicInfo] (state: S, payload: UserBasicInfo): void
  [MutationTypes.SetInvitationCode] (state: S, payload: string): void
  [MutationTypes.SetLoginVerify] (state: S, payload: boolean): void
  [MutationTypes.SetUsername] (state: S, payload: string): void
  [MutationTypes.SetGender] (state: S, payload: string): void
  [MutationTypes.SetFirstName] (state: S, payload: string): void
  [MutationTypes.SetLastName] (state: S, payload: string): void
  [MutationTypes.SetPostalCode] (state: S, payload: string): void
  [MutationTypes.SetProvince] (state: S, payload: string): void
  [MutationTypes.SetStreetAddress1] (state: S, payload: string): void
  [MutationTypes.SetStreetAddress2] (state: S, payload: string): void
  [MutationTypes.SetCity] (state: S, payload: string): void
  [MutationTypes.SetCountry] (state: S, payload: string): void
  [MutationTypes.SetEmailAddress] (state: S, payload: string): void
  [MutationTypes.SetPhoneNumber] (state: S, payload: string): void
  [MutationTypes.SetGoogleAuthenticator] (state: S, payload: boolean): void
  [MutationTypes.SetGoogleLoginVerify] (state: S, payload: boolean): void
  [MutationTypes.SetLoginHistory] (state: S, payload: Array<LoginRecord>): void
  [MutationTypes.ClearUserInfo] (state: S): void
  [MutationTypes.SetLoadGoogleRecaptcha] (state: S, payload: boolean): void
}

const mutations: MutationTree<UserState> & UserMutations = {
  [MutationTypes.SetUserInfo] (state: UserState, payload: UserInfo) {
    state.info = payload
  },
  [MutationTypes.SetUserLogined] (state: UserState, payload: boolean) {
    state.logined = payload
  },
  [MutationTypes.SetUserBasicInfo] (state: UserState, payload: UserBasicInfo) {
    state.info.UserBasicInfo = payload
  },
  [MutationTypes.SetInvitationCode] (state: UserState, payload: string) {
    state.invitationCode = payload
  },
  [MutationTypes.SetLoginVerify] (state: UserState, payload: boolean) {
    state.loginVerify = payload
  },
  [MutationTypes.SetUsername] (state: UserState, payload: string) {
    state.info.UserBasicInfo.Username = payload
  },
  [MutationTypes.SetGender] (state: UserState, payload: string) {
    state.info.UserBasicInfo.Gender = payload
  },
  [MutationTypes.SetFirstName] (state: UserState, payload: string) {
    state.info.UserBasicInfo.FirstName = payload
  },
  [MutationTypes.SetLastName] (state: UserState, payload: string) {
    state.info.UserBasicInfo.LastName = payload
  },
  [MutationTypes.SetPostalCode] (state: UserState, payload: string) {
    state.info.UserBasicInfo.PostalCode = payload
  },
  [MutationTypes.SetProvince] (state: UserState, payload: string) {
    state.info.UserBasicInfo.Province = payload
  },
  [MutationTypes.SetStreetAddress1] (state: UserState, payload: string) {
    state.info.UserBasicInfo.StreetAddress1 = payload
  },
  [MutationTypes.SetStreetAddress2] (state: UserState, payload: string) {
    state.info.UserBasicInfo.StreetAddress2 = payload
  },
  [MutationTypes.SetCity] (state: UserState, payload: string) {
    state.info.UserBasicInfo.City = payload
  },
  [MutationTypes.SetCountry] (state: UserState, payload: string) {
    state.info.UserBasicInfo.Country = payload
  },
  [MutationTypes.SetEmailAddress] (state: UserState, payload: string) {
    state.info.UserBasicInfo.EmailAddress = payload
  },
  [MutationTypes.SetPhoneNumber] (state: UserState, payload: string) {
    state.info.UserBasicInfo.PhoneNumber = payload
  },
  [MutationTypes.SetGoogleLoginVerify] (state: UserState, payload: boolean) {
    state.info.UserAppInfo.UserApplicationInfo.GALogin = payload
  },
  [MutationTypes.SetGoogleAuthenticator] (state: UserState, payload: boolean) {
    state.info.UserAppInfo.UserApplicationInfo.GAVerify = payload
  },
  [MutationTypes.SetLoginHistory] (state: UserState, payload: Array<LoginRecord>) {
    state.loginHistory = payload
  },
  [MutationTypes.ClearUserInfo] (state: UserState) {
    state.info = NilUserInfo
    state.invitationCode = ''
    state.loginHistory = []
  },
  [MutationTypes.SetLoadGoogleRecaptcha] (state: UserState, payload: boolean) {
    state.loadGoogleRecaptcha = payload
  }
}

export { UserMutations, mutations }
