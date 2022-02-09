import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { CreateCoinRequest, CreateCoinResponse, GetCoinsRequest, GetCoinsResponse } from './types'
import { CoinsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { CoinMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface CoinActions {
  [ActionTypes.GetCoins]({
    commit
  }: AugmentedActionContext<
    CoinsState,
    RootState,
    CoinMutations<CoinsState>>,
    req: GetCoinsRequest): void

  [ActionTypes.CreateCoin]({
    commit
  }: AugmentedActionContext<
    CoinsState,
    RootState,
    CoinMutations<CoinsState>>,
    req: CreateCoinRequest): void
}

const actions: ActionTree<CoinsState, RootState> = {
  [ActionTypes.GetCoins] ({ commit }, req: GetCoinsRequest) {
    doAction<GetCoinsRequest, GetCoinsResponse>(
      commit,
      API.GET_COINS,
      req,
      req.Message,
      (resp: GetCoinsResponse): void => {
        commit(MutationTypes.SetCoins, resp.Infos)
      })
  },

  [ActionTypes.CreateCoin] ({ commit }, req: CreateCoinRequest) {
    doAction<CreateCoinRequest, CreateCoinResponse>(
      commit,
      API.CREATE_COIN,
      req,
      req.Message,
      (resp: CreateCoinResponse): void => {
        commit(MutationTypes.SetCoins, [resp.Info])
      })
  }
}

export {
  actions,
  CoinActions
}
