import { AxiosResponse } from 'axios'
import { api } from 'src/boot/axios'
import { Commit } from 'vuex'
import { notificationPush, notificationPop } from './notifications/helper'
import { ReqMessage, Notification as MyNotification } from './notifications/types'
import { MutationTypes as NotificationMutationTypes } from './notifications/mutation-types'

function doAction<MyRequest, MyResponse> (
  commit: Commit,
  url: string,
  req: MyRequest,
  message: ReqMessage | undefined,
  success: (resp: MyResponse) => void) {
  let waitingNotification: MyNotification
  if (message && message.Waiting) {
    waitingNotification = notificationPush(message.ModuleKey, message.Waiting)
    commit(NotificationMutationTypes.Push, waitingNotification)
  }
  api
    .post<MyRequest, AxiosResponse<MyResponse>>(url, req)
    .then((response: AxiosResponse<MyResponse>) => {
      console.log(url, req, response)
      success(response.data)
      if (waitingNotification) {
        commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
      }
    })
    .catch((err: Error) => {
      if (message && message.Error) {
        message.Error.Description = err.message
        const errorNotification = notificationPush(message.ModuleKey, message.Error)
        commit(NotificationMutationTypes.Push, errorNotification)
      }
    })
}

function doGet<MyRequest, MyResponse> (
  commit: Commit,
  url: string,
  req: MyRequest,
  message: ReqMessage | undefined,
  success: (resp: MyResponse) => void) {
  let waitingNotification: MyNotification
  if (message && message.Waiting) {
    waitingNotification = notificationPush(message.ModuleKey, message.Waiting)
    commit(NotificationMutationTypes.Push, waitingNotification)
  }
  api
    .get<MyRequest, AxiosResponse<MyResponse>>(url)
    .then((response: AxiosResponse<MyResponse>) => {
      success(response.data)
      if (waitingNotification) {
        commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
      }
    })
    .catch((err: Error) => {
      if (message && message.Error) {
        message.Error.Description = err.message
        const errorNotification = notificationPush(message.ModuleKey, message.Error)
        commit(NotificationMutationTypes.Push, errorNotification)
      }
    })
}

export {
  doAction,
  doGet
}
