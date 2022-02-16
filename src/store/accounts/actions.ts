import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { AccountsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { AccountMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { GetWithdrawAccountsRequest, GetWithdrawAccountsResponse } from './types'

interface AccountActions {
  [ActionTypes.GetUserWithdrawAccountsByAppUser]({
    commit
  }: AugmentedActionContext<
    AccountsState,
    RootState,
    AccountMutations<AccountsState>>,
    req: GetWithdrawAccountsRequest): void
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
  }
}

export {
  actions,
  AccountActions
}
