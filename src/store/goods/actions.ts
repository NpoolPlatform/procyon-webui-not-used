import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { GoodMutations } from './mutations'
import { GoodState } from './state'
import {
  GetGoodRequest,
  GetGoodResponse,
  GetGoodsRequest,
  GetGoodsResponse,
  GetPromotionsRequest,
  GetPromotionsResponse,
  GetRecommendGoodsRequest,
  GetRecommendGoodsResponse,
  GoodURLPath
} from './types'
import { doAction } from '../action'
import { MutationTypes } from '../goods/mutation-types'

// use public api
interface GoodActions {
  [ActionTypes.GetGoods] ({
    commit
  }: AugmentedActionContext<GoodState,
    RootState,
    GoodMutations<GoodState>>, payload: GetGoodsRequest): void

  [ActionTypes.GetRecommendGoods] ({
    commit
  }: AugmentedActionContext<GoodState,
    RootState,
    GoodMutations<GoodState>>, payload: GetRecommendGoodsRequest): void

  [ActionTypes.GetPromotions] ({
    commit
  }: AugmentedActionContext<GoodState,
    RootState,
    GoodMutations<GoodState>>, payload: GetPromotionsRequest): void

  [ActionTypes.GetGood] ({
    commit
  }: AugmentedActionContext<GoodState,
    RootState,
    GoodMutations<GoodState>>, payload: GetGoodRequest): void
}

const actions: ActionTree<GoodState, RootState> = {
  [ActionTypes.GetGoods] ({ commit }, req: GetGoodsRequest) {
    doAction<GetGoodsRequest, GetGoodsResponse>(
      commit,
      GoodURLPath.GET_GOODS,
      req,
      req.Message,
      (resp: GetGoodsResponse): void => {
        commit(MutationTypes.SetGoods, resp.Infos)
      })
  },

  [ActionTypes.GetRecommendGoods] ({ commit }, req: GetRecommendGoodsRequest) {
    doAction<GetRecommendGoodsRequest, GetRecommendGoodsResponse>(
      commit,
      GoodURLPath.GET_RECOMMEND_GOODS,
      req,
      req.Message,
      (resp: GetRecommendGoodsResponse): void => {
        commit(MutationTypes.SetRecommendGoods, resp.Infos)
      })
  },

  [ActionTypes.GetPromotions] ({ commit }, req: GetPromotionsRequest) {
    doAction<GetPromotionsRequest, GetPromotionsResponse>(
      commit,
      GoodURLPath.GET_PROMOTIONS,
      req,
      req.Message,
      (resp: GetPromotionsResponse): void => {
        commit(MutationTypes.SetPromotions, resp.Infos)
      })
  },

  [ActionTypes.GetGood] ({ commit }, req: GetGoodRequest) {
    doAction<GetGoodRequest, GetGoodResponse>(
      commit,
      GoodURLPath.GET_GOOD,
      req,
      req.Message,
      (resp: GetGoodResponse): void => {
        commit(MutationTypes.SetGood, resp.Info)
      })
  }
}

export { actions, GoodActions }
