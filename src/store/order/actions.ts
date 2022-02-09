import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { OrderMutations } from './mutations'
import { OrderState } from './state'
import { post } from 'src/boot/axios'
import {
  GetOrdersByAppUserRequest,
  GetOrdersByAppUserResponse,
  OrderURLPath,
  UserOrder
} from './types'
import { ItemStateTarget } from 'src/store/types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage, TimeStampToDate } from 'src/utils/utils'
import { GoodURLPath, GetGoodRequest, GetGoodResponse } from 'src/store/goods/types'
import { useI18n } from 'boot/i18n'

// use public api
interface OrderActions {
  [ActionTypes.GetUserOrders] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, payload: GetOrdersByAppUserRequest): void
}

const actions: ActionTree<OrderState, RootState> = {
  [ActionTypes.GetUserOrders] ({ commit, state }, payload: GetOrdersByAppUserRequest) {
    const { t } = useI18n()
    commit(notifyMutation.SetInnerLoading, {
      Key: ItemStateTarget.GetUserOrder,
      value: true
    })
    post<GetOrdersByAppUserRequest, GetOrdersByAppUserResponse>(OrderURLPath.GET_ORDERS_BY_APP_USER, payload)
      .then((resp: GetOrdersByAppUserResponse) => {
        commit(MutationTypes.SetUserOrders, [])
        commit(MutationTypes.SetTotalCapacity, 0)
        commit(MutationTypes.SetTotalAmount, 0)

        resp.Infos.forEach(order => {
          const request: GetGoodRequest = {
            ID: order.Good.Good.ID as string
          }
          post<GetGoodRequest, GetGoodResponse>(GoodURLPath.GET_GOOD, request)
            .then((resp: GetGoodResponse) => {
              let reductionAmount = 0
              if (order.UserSpecialReduction) {
                reductionAmount = order.UserSpecialReduction.Amount
              }
              const good = resp.Info
              const myOrder: UserOrder = {
                Date: TimeStampToDate(order.Order.Start, 'YYYY-MM-DD HH:mm:ss'),
                Product: good.Main?.Name as string,
                Amount: order.Order.Units.toString() + good.Good.Unit,
                Price: good.Good.Price.toString() + good.Good.PriceCurrency.Unit + '/' + good.Good.Unit,
                Discount: ((reductionAmount * 100 / order.Order.Units / good.Good.Price).toFixed(3)).toString() + '%',
                TechFee: '20%',
                Period: good.Good.DurationDays.toString(),
                Total: order.Order.Payment.Amount.toString()
              }
              // TODO: problem implementation
              const totalUnits = state.totalCapacity + order.Order.Units
              const totalAmount = state.totalAmount + order.Order.Payment.Amount

              commit(MutationTypes.SetTotalCapacity, totalUnits)
              commit(MutationTypes.SetTotalAmount, totalAmount)

              commit(MutationTypes.SetDurationDays, good.Good.DurationDays)

              const myOrders: Array<UserOrder> = []
              for (let i = 0; i < state.userOrders.length; i++) {
                myOrders.push(state.userOrders[i])
              }
              myOrders.push(myOrder)
              commit(MutationTypes.SetUserOrders, myOrders)
            })
            .catch((err: Error) => {
              commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.GetUserOrders.Fail'), err.message, 'negative'))
              commit(notifyMutation.SetInnerLoading, {
                Key: ItemStateTarget.GetUserOrder,
                value: false
              })
            })
        })

        commit(notifyMutation.SetInnerLoading, {
          Key: ItemStateTarget.GetUserOrder,
          value: false
        })
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetUserOrders, [])
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.GetUserOrders.Fail'), err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, {
          Key: ItemStateTarget.GetUserOrder,
          value: false
        })
      })
  }
}

export { actions, OrderActions }
