import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { OrderMutations } from './mutations'
import { OrderState } from './state'
import { post } from 'src/boot/axios'
import {
  GetOrdersDetailByAppUserRequest,
  GetOrdersDetailByAppUserResponse,
  OrderURLPath,
  UserOrderDetail
} from './types'
import { RequestInput } from 'src/store/types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage, TimeStampToDate } from 'src/utils/utils'
import { GoodURLPath, GetGoodDetailRequest, GetGoodDetailResponse } from 'src/store/goods/types'

// use public api
interface OrderActions {
  [ActionTypes.GetUserOrderDetails] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, payload: RequestInput<GetOrdersDetailByAppUserRequest>): void
}

const actions: ActionTree<OrderState, RootState> = {
  [ActionTypes.GetUserOrderDetails] ({ commit }, payload: RequestInput<GetOrdersDetailByAppUserRequest>) {
    commit(notifyMutation.SetInnerLoading, true)
    post<GetOrdersDetailByAppUserRequest, GetOrdersDetailByAppUserResponse>(OrderURLPath.GET_ORDERS_DETAIL_BY_APP_USER, payload.requestInput)
      .then((resp: GetOrdersDetailByAppUserResponse) => {
        resp.Details.forEach(order => {
          const request: GetGoodDetailRequest = {
            ID: order.Good.ID
          }
          void post<GetGoodDetailRequest, GetGoodDetailResponse>(GoodURLPath.GET_GOOD_DETAIL, request).then((resp: GetGoodDetailResponse) => {
            const good = resp.Detail
            const myOrder: UserOrderDetail = {
              Date: TimeStampToDate(order.Start, 'YYYY-MM-DD HH:mm:ss'),
              Product: good.CoinInfo.Name,
              Amount: order.Units.toString() + good.Unit,
              Price: good.Price.toString() + good.PriceCurrency.Unit + '/' + good.Unit,
              Discount: (
                Number(order.Discount) +
                (Number(order.SpecialReductionAmount) /
                  (Number(order.Units) * Number(good.Price))) *
                100
              ).toString() + '%',
              TechFee: '20%',
              Period: good.DurationDays.toString(),
              Total: order.Payment.Amount.toString()
            }
            commit(MutationTypes.SetTotalCapacity, order.Units)
            commit(MutationTypes.SetTotalAmount, order.Payment.Amount)
            commit(MutationTypes.SetDurationDays, good.DurationDays)
            commit(MutationTypes.SetUserOrderDetails, myOrder)
          }).catch((err: Error) => {
            commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
            commit(notifyMutation.SetInnerLoading, false)
          })
        })
        commit(notifyMutation.SetInnerLoading, false)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetUserOrderDetails, [])
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, false)
      })
  }
}

export { actions, OrderActions }
