import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AccountsState } from './state'
import { WithdrawAccount } from './types'

type AccountGetters = {
  getWithdrawAccounts (state: AccountsState): Array<WithdrawAccount>
}

const getters: GetterTree<AccountsState, RootState> & AccountGetters = {
  getWithdrawAccounts: (state: AccountsState): Array<WithdrawAccount> => state.WithdrawAccounts
}

export { AccountGetters, getters }
