import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AccountsState } from './state'
import { WithdrawAccount } from './types'

type AccountGetters = {
  getWithdrawAccounts (state: AccountsState): Array<WithdrawAccount>
  getWithdrawAccountsByCoin (state: AccountsState): (coinTypeID: string) => Array<WithdrawAccount>
}

const getters: GetterTree<AccountsState, RootState> & AccountGetters = {
  getWithdrawAccounts: (state: AccountsState): Array<WithdrawAccount> => state.WithdrawAccounts,
  getWithdrawAccountsByCoin (state: AccountsState): (coinTypeID: string) => Array<WithdrawAccount> {
    return (coinTypeID: string): Array<WithdrawAccount> => {
      const accounts = [] as Array<WithdrawAccount>
      state.WithdrawAccounts.forEach((account) => {
        if (account.Account.CoinTypeID === coinTypeID) {
          accounts.push(account)
        }
      })
      return accounts
    }
  }
}

export { AccountGetters, getters }
