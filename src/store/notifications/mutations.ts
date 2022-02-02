import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { NotificationState } from './state'
import { Notification, PopNotification } from './types'

type NotificationMutations<S = NotificationState> = {
  [MutationTypes.Push] (state: S, payload: Notification): void
  [MutationTypes.Pop] (state: S, payload: PopNotification): void
}

const mutations: MutationTree<NotificationState> & NotificationMutations = {
  [MutationTypes.Push] (state: NotificationState, payload: Notification) {
    let notifications = state.Notifications.get(payload.ModuleKey)
    if (notifications) {
      notifications.push(payload)
    } else {
      notifications = [payload]
    }
    state.Notifications.set(payload.ModuleKey, notifications)
  },

  [MutationTypes.Pop] (state: NotificationState, payload: PopNotification) {
    let notifications = state.Notifications.get(payload.ModuleKey)
    if (notifications) {
      notifications.pop()
      notifications = notifications.filter((notification) => {
        return notification.ID !== payload.ID
      })
    }
    state.Notifications.set(payload.ModuleKey, notifications as Array<Notification>)
  }
}

export { NotificationMutations, mutations }
