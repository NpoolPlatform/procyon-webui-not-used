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
  message: ReqMessage,
  success: (resp: MyResponse) => void) {
  let waitingNotification: MyNotification
  if (message.Waiting) {
    waitingNotification = notificationPush(message.ModuleKey, message.Waiting)
    commit(NotificationMutationTypes.Push, waitingNotification)
  }
  api
    .post<MyRequest, AxiosResponse<MyResponse>>(url, req)
    .then((response: AxiosResponse<MyResponse>) => {
      success(response.data)
      if (waitingNotification) {
        commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
      }
    })
    .catch((err: Error) => {
      const error = message.Error
      if (error) {
        error.Description = err.message
        const errorNotification = notificationPush(message.ModuleKey, error)
        commit(NotificationMutationTypes.Push, errorNotification)
      }
    })
}

export {
  doAction
}
