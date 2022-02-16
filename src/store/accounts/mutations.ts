import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AccountsState } from './state'
import { WithdrawAccount } from './types'

type AccountMutations<S = AccountsState> = {
  [MutationTypes.SetWithdrawAccounts] (state: S, payload: Array<WithdrawAccount>): void
}

const mutations: MutationTree<AccountsState> & AccountMutations = {
  [MutationTypes.SetWithdrawAccounts] (state: AccountsState, payload: Array<WithdrawAccount>) {
    state.WithdrawAccounts = payload
  }
}

export { AccountMutations, mutations }
