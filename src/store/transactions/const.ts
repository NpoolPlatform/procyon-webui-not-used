enum API {
  GET_USER_TRANSACTIONS_BY_APP_USER = '/cloud-hashing-billing/v1/get/coin/account/transactions/by/app/user',
  SUBMIT_USER_WITHDRAW = '/cloud-hashing-apis-v2/v1/submit/user/withdraw'
}

enum WithdrawType {
  Benefit = 'benefit',
  Commission = 'commission'
}

export {
  API,
  WithdrawType
}
