import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AccountsState } from './state'
import { Withdraw, WithdrawAccount } from './types'

type AccountMutations<S = AccountsState> = {
  [MutationTypes.SetWithdrawAccounts] (state: S, payload: Array<WithdrawAccount>): void
  [MutationTypes.SetWithdrawAccount] (state: S, payload: WithdrawAccount): void
  [MutationTypes.DeleteWithdrawAddress] (state: S, payload: Withdraw): void
}

const mutations: MutationTree<AccountsState> & AccountMutations = {
  [MutationTypes.SetWithdrawAccounts] (state: AccountsState, payload: Array<WithdrawAccount>) {
    state.WithdrawAccounts = payload
  },
  [MutationTypes.SetWithdrawAccount] (state: AccountsState, payload: WithdrawAccount) {
    for (let i = 0; i < state.WithdrawAccounts.length; i++) {
      if (payload.Account.ID === state.WithdrawAccounts[i].Account.ID) {
        state.WithdrawAccounts.splice(i, 1, payload)
        return
      }
    }
    state.WithdrawAccounts.push(payload)
  },
  [MutationTypes.DeleteWithdrawAddress] (state: AccountsState, payload: Withdraw) {
    for (let i = 0; i < state.WithdrawAccounts.length; i++) {
      if (payload.ID === state.WithdrawAccounts[i].Address.ID) {
        state.WithdrawAccounts.splice(i, 1)
        return
      }
    }
  }
}

export { AccountMutations, mutations }
