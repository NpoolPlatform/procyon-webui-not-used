import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { OrderMutations } from './mutations'
import { OrderState } from './state'
import { post } from 'src/boot/axios'
import {
  CreateOrderPaymentRequest,
  CreateOrderPaymentResponse,
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersByAppUserRequest,
  GetOrdersByAppUserResponse,
  OrderURLPath,
  SubmitOrderRequest,
  SubmitOrderResponse,
  UpdatePaymentRequest,
  UpdatePaymentResponse
} from './types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage } from 'src/utils/utils'
import { useI18n } from 'boot/i18n'
import { doAction } from '../action'

// use public api
interface OrderActions {
  [ActionTypes.GetOrders] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, payload: GetOrdersByAppUserRequest): void

  [ActionTypes.SubmitOrder] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, payload: SubmitOrderRequest): void

  [ActionTypes.CreateOrderPayment] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, payload: CreateOrderPaymentRequest): void

  [ActionTypes.UpdatePayment] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, payload: UpdatePaymentRequest): void

  [ActionTypes.GetOrder] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, payload: GetOrderRequest): void
}

const actions: ActionTree<OrderState, RootState> = {
  [ActionTypes.GetOrders] ({ commit }, payload: GetOrdersByAppUserRequest) {
    const { t } = useI18n()
    post<GetOrdersByAppUserRequest, GetOrdersByAppUserResponse>(OrderURLPath.GET_ORDERS_BY_APP_USER, payload)
      .then((resp: GetOrdersByAppUserResponse) => {
        commit(MutationTypes.SetOrders, resp.Infos)
      })
      .catch((err: Error) => {
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(t('notify.GetUserOrders.Fail'), err.message, 'negative'))
      })
  },

  [ActionTypes.SubmitOrder] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, req: SubmitOrderRequest): void {
    doAction<SubmitOrderRequest, SubmitOrderResponse>(
      commit,
      OrderURLPath.SUBMIT_ORDER,
      req,
      req.Message,
      (resp: SubmitOrderResponse): void => {
        commit(MutationTypes.SetOrder, resp.Info)
      })
  },

  [ActionTypes.CreateOrderPayment] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, req: CreateOrderPaymentRequest): void {
    doAction<CreateOrderPaymentRequest, CreateOrderPaymentResponse>(
      commit,
      OrderURLPath.CREATE_ORDER_PAYMENT,
      req,
      req.Message,
      (resp: CreateOrderPaymentResponse): void => {
        commit(MutationTypes.SetOrderPayment, resp.Info)
      })
  },

  [ActionTypes.UpdatePayment] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, req: UpdatePaymentRequest): void {
    doAction<UpdatePaymentRequest, UpdatePaymentResponse>(
      commit,
      OrderURLPath.UPDATE_PAYMENT,
      req,
      req.Message,
      (resp: UpdatePaymentResponse): void => {
        commit(MutationTypes.SetPayment, resp.Info)
      })
  },

  [ActionTypes.GetOrder] ({
    commit
  }: AugmentedActionContext<OrderState,
    RootState,
    OrderMutations<OrderState>>, req: GetOrderRequest): void {
    doAction<GetOrderRequest, GetOrderResponse>(
      commit,
      OrderURLPath.GET_ORDER,
      req,
      req.Message,
      (resp: GetOrderResponse): void => {
        commit(MutationTypes.SetOrderPayment, resp.Info)
      })
  }
}

export { actions, OrderActions }
