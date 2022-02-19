import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  CreateCoinRequest,
  CreateCoinResponse,
  GetCoinsCurrenciesRequest,
  GetCoinsRequest,
  GetCoinsResponse
} from './types'
import { CoinsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { CoinMutations } from './mutations'
import { API } from './const'
import { doAction, doGet } from '../action'

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

  [ActionTypes.GetCoinsCurrencies]({
    commit
  }: AugmentedActionContext<
    CoinsState,
    RootState,
    CoinMutations<CoinsState>>,
    req: GetCoinsCurrenciesRequest): void
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
  },

  [ActionTypes.GetCoinsCurrencies] ({ commit }, req: GetCoinsCurrenciesRequest) {
    const url = API.GET_COINS_CURRENCIES + '?ids=bitcoin,ethereum,filecoin&vs_currencies=usd,jpy'
    doGet<GetCoinsCurrenciesRequest, Map<string, Map<string, number>>>(
      commit,
      url,
      req,
      req.Message,
      (resp: Map<string, Map<string, number>>): void => {
        commit(MutationTypes.SetCoinsCurrencies, resp)
      })
  }
}

export {
  actions,
  CoinActions
}
