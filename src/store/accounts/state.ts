import { WithdrawAccount } from './types'

interface AccountsState {
  WithdrawAccounts: Array<WithdrawAccount>
}

function state (): AccountsState {
  return {
    WithdrawAccounts: []
  }
}

export {
  state,
  AccountsState
}
