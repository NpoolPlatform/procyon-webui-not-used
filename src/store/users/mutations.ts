import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { UserState } from './state'
import { AppUserExtra, LoginHistory, UserInfo } from './types'

type UserMutations<S = UserState> = {
  [MutationTypes.SetUserInfo] (state: S, payload: UserInfo): void
  [MutationTypes.SetUserLogined] (state: S, payload: boolean): void
  [MutationTypes.SetInvitationCode] (state: S, payload: string): void
  [MutationTypes.SetLoginVerify] (state: S, payload: boolean): void
  [MutationTypes.SetUsername] (state: S, payload: string): void
  [MutationTypes.SetGender] (state: S, payload: string): void
  [MutationTypes.SetFirstName] (state: S, payload: string): void
  [MutationTypes.SetLastName] (state: S, payload: string): void
  [MutationTypes.SetPostalCode] (state: S, payload: string): void
  [MutationTypes.SetAddressFields] (state: S, payload: Array<string>): void
  [MutationTypes.SetEmailAddress] (state: S, payload: string): void
  [MutationTypes.SetPhoneNumber] (state: S, payload: string): void
  [MutationTypes.SetGoogleLoginVerify] (state: S, payload: boolean): void
  [MutationTypes.SetLoginHistories] (state: S, payload: Array<LoginHistory>): void
  [MutationTypes.ClearUserInfo] (state: S): void
  [MutationTypes.SetLoadGoogleRecaptcha] (state: S, payload: boolean): void
  [MutationTypes.SetUserExtra] (state: S, payload: AppUserExtra): void
  [MutationTypes.SetGoogleAuthenticationVerified] (state: S, payload: boolean): void
}

const mutations: MutationTree<UserState> & UserMutations = {
  [MutationTypes.SetUserInfo] (state: UserState, payload: UserInfo) {
    state.info = payload
    if (!state.info.Extra) {
      state.info.Extra = {
        AppID: payload.User.AppID,
        UserID: payload.User.ID
      }
    }
    if (!state.info.Ctrl) {
      state.info.Ctrl = {
        AppID: payload.User.AppID,
        UserID: payload.User.ID
      }
    }
  },
  [MutationTypes.SetUserLogined] (state: UserState, payload: boolean) {
    state.logined = payload
  },
  [MutationTypes.SetInvitationCode] (state: UserState, payload: string) {
    state.invitationCode = payload
  },
  [MutationTypes.SetLoginVerify] (state: UserState, payload: boolean) {
    state.loginVerify = payload
  },
  [MutationTypes.SetUsername] (state: UserState, payload: string) {
    state.info.Extra.Username = payload
  },
  [MutationTypes.SetGender] (state: UserState, payload: string) {
    state.info.Extra.Gender = payload
  },
  [MutationTypes.SetFirstName] (state: UserState, payload: string) {
    state.info.Extra.FirstName = payload
  },
  [MutationTypes.SetLastName] (state: UserState, payload: string) {
    state.info.Extra.LastName = payload
  },
  [MutationTypes.SetPostalCode] (state: UserState, payload: string) {
    state.info.Extra.PostalCode = payload
  },
  [MutationTypes.SetAddressFields] (state: UserState, payload: Array<string>) {
    state.info.Extra.AddressFields = payload
  },
  [MutationTypes.SetEmailAddress] (state: UserState, payload: string) {
    state.info.User.EmailAddress = payload
  },
  [MutationTypes.SetPhoneNumber] (state: UserState, payload: string) {
    state.info.User.PhoneNO = payload
  },
  [MutationTypes.SetGoogleLoginVerify] (state: UserState, payload: boolean) {
    state.info.Ctrl.SigninVerifyByGoogleAuthentication = payload
  },
  [MutationTypes.SetLoginHistories] (state: UserState, payload: Array<LoginHistory>) {
    state.loginHistories = payload
  },
  [MutationTypes.ClearUserInfo] (state: UserState) {
    state.info = {
      User: {},
      Extra: {},
      Ctrl: {}
    }
    state.invitationCode = ''
    state.loginHistories = []
  },
  [MutationTypes.SetLoadGoogleRecaptcha] (state: UserState, payload: boolean) {
    state.loadGoogleRecaptcha = payload
  },
  [MutationTypes.SetUserExtra] (state: UserState, payload: AppUserExtra) {
    state.info.Extra = payload
  },
  [MutationTypes.SetGoogleAuthenticationVerified] (state: UserState, payload: boolean) {
    state.info.Ctrl.GoogleAuthenticationVerified = payload
  }
}

export { UserMutations, mutations }
