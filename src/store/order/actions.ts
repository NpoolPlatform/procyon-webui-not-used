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
import { ItemStateTarget } from 'src/store/types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage, TimeStampToDate } from 'src/utils/utils'
import { GoodURLPath, GetGoodDetailRequest, GetGoodDetailResponse } from 'src/store/goods/types'
import { useI18n } from 'boot/i18n'

// use public api
interface OrderActions {
  [ActionTypes.GetUserOrderDetails] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, payload: GetOrdersDetailByAppUserRequest): void
}

const actions: ActionTree<OrderState, RootState> = {
  [ActionTypes.GetUserOrderDetails] ({ commit, state }, payload: GetOrdersDetailByAppUserRequest) {
    const { t } = useI18n()
    commit(notifyMutation.SetInnerLoading, {
      Key: ItemStateTarget.GetUserOrderDetail,
      value: true
    })
    post<GetOrdersDetailByAppUserRequest, GetOrdersDetailByAppUserResponse>(OrderURLPath.GET_ORDERS_DETAIL_BY_APP_USER, payload)
      .then((resp: GetOrdersDetailByAppUserResponse) => {
        commit(MutationTypes.SetUserOrderDetails, [])
        commit(MutationTypes.SetTotalCapacity, 0)
        commit(MutationTypes.SetTotalAmount, 0)

        resp.Details.forEach(order => {
          const request: GetGoodDetailRequest = {
            ID: order.Good.ID
          }
          post<GetGoodDetailRequest, GetGoodDetailResponse>(GoodURLPath.GET_GOOD_DETAIL, request)
            .then((resp: GetGoodDetailResponse) => {
              const good = resp.Detail
              const myOrder: UserOrderDetail = {
                Date: TimeStampToDate(order.Start, 'YYYY-MM-DD HH:mm:ss'),
                Product: good.Main?.Name as string,
                Amount: order.Units.toString() + good.Good.Unit,
                Price: good.Good.Price.toString() + good.Good.PriceCurrency.Unit + '/' + good.Good.Unit,
                Discount: ((order.Discount + order.SpecialReductionAmount * 100 / order.Units / good.Good.Price).toFixed(3)).toString() + '%',
                TechFee: '20%',
                Period: good.Good.DurationDays.toString(),
                Total: order.Payment.Amount.toString()
              }
              // TODO: problem implementation
              const totalUnits = state.totalCapacity + order.Units
              const totalAmount = state.totalAmount + order.Payment.Amount

              commit(MutationTypes.SetTotalCapacity, totalUnits)
              commit(MutationTypes.SetTotalAmount, totalAmount)

              commit(MutationTypes.SetDurationDays, good.Good.DurationDays)

              const myOrders: Array<UserOrderDetail> = []
              for (let i = 0; i < state.userOrderDetails.length; i++) {
                myOrders.push(state.userOrderDetails[i])
              }
              myOrders.push(myOrder)
              commit(MutationTypes.SetUserOrderDetails, myOrders)
            })
            .catch((err: Error) => {
              commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.GetUserOrders.Fail'), err.message, 'negative'))
              commit(notifyMutation.SetInnerLoading, {
                Key: ItemStateTarget.GetUserOrderDetail,
                value: false
              })
            })
        })

        commit(notifyMutation.SetInnerLoading, {
          Key: ItemStateTarget.GetUserOrderDetail,
          value: false
        })
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetUserOrderDetails, [])
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.GetUserOrders.Fail'), err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, {
          Key: ItemStateTarget.GetUserOrderDetail,
          value: false
        })
      })
  }
}

export { actions, OrderActions }
