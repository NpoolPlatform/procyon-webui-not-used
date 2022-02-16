import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { TransactionsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { TransactionMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { GetTransactionsRequest, GetTransactionsResponse } from './types'

interface TransactionActions {
  [ActionTypes.GetUserTransactionsByAppUser]({
    commit
  }: AugmentedActionContext<
    TransactionsState,
    RootState,
    TransactionMutations<TransactionsState>>,
    req: GetTransactionsRequest): void
}

const actions: ActionTree<TransactionsState, RootState> = {
  [ActionTypes.GetUserTransactionsByAppUser] ({ commit }, req: GetTransactionsRequest) {
    doAction<GetTransactionsRequest, GetTransactionsResponse>(
      commit,
      API.GET_USER_TRANSACTIONS_BY_APP_USER,
      req,
      req.Message,
      (resp: GetTransactionsResponse): void => {
        commit(MutationTypes.SetTransactions, resp.Infos)
      })
  }
}

export {
  actions,
  TransactionActions
}
