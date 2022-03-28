import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { AccountsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { AccountMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import {
  DeleteWithdrawAddressRequest,
  DeleteWithdrawAddressResponse,
  GetWithdrawAccountsRequest,
  GetWithdrawAccountsResponse,
  SetWithdrawAddressRequest,
  SetWithdrawAddressResponse
} from './types'

interface AccountActions {
  [ActionTypes.GetUserWithdrawAccountsByAppUser]({
    commit
  }: AugmentedActionContext<
    AccountsState,
    RootState,
    AccountMutations<AccountsState>>,
    req: GetWithdrawAccountsRequest): void

  [ActionTypes.SetWithdrawAddress]({
    commit
  }: AugmentedActionContext<
    AccountsState,
    RootState,
    AccountMutations<AccountsState>>,
    req: SetWithdrawAddressRequest): void

  [ActionTypes.DeleteWithdrawAddress]({
    commit
  }: AugmentedActionContext<
    AccountsState,
    RootState,
    AccountMutations<AccountsState>>,
    req: DeleteWithdrawAddressRequest): void
}

const actions: ActionTree<AccountsState, RootState> = {
  [ActionTypes.GetUserWithdrawAccountsByAppUser] ({ commit }, req: GetWithdrawAccountsRequest) {
    doAction<GetWithdrawAccountsRequest, GetWithdrawAccountsResponse>(
      commit,
      API.GET_USER_WITHDRAW_ACCOUNTS_BY_APP_USER,
      req,
      req.Message,
      (resp: GetWithdrawAccountsResponse): void => {
        commit(MutationTypes.SetWithdrawAccounts, resp.Infos)
      })
  },

  [ActionTypes.SetWithdrawAddress] ({ commit }, req: SetWithdrawAddressRequest) {
    doAction<SetWithdrawAddressRequest, SetWithdrawAddressResponse>(
      commit,
      API.SET_WITHDRAW_ADDRESS,
      req,
      req.NotifyMessage,
      (resp: SetWithdrawAddressResponse): void => {
        commit(MutationTypes.SetWithdrawAccount, resp.Info)
      })
  },

  [ActionTypes.DeleteWithdrawAddress] ({ commit }, req: DeleteWithdrawAddressRequest) {
    doAction<DeleteWithdrawAddressRequest, DeleteWithdrawAddressResponse>(
      commit,
      API.DELETE_WITHDRAW_ADDRESS,
      req,
      req.Message,
      (resp: DeleteWithdrawAddressResponse): void => {
        commit(MutationTypes.DeleteWithdrawAddress, resp.Info)
      })
  }
}

export {
  actions,
  AccountActions
}
