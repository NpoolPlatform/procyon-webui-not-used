import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { NotificationState } from './state'
import { Notification } from './types'
import { ModuleKey } from './const'

type NotificationGetters = {
  peekNotification (state: NotificationState): (key: ModuleKey) => Notification | undefined
}

const getters: GetterTree<NotificationState, RootState> & NotificationGetters = {
  peekNotification: (state: NotificationState): (key: ModuleKey) => Notification | undefined => {
    return (key: ModuleKey) => {
      let notification: Notification | undefined
      const notifications = state.Notifications.get(key)
      if (notifications && notifications.length > 0) {
        notification = notifications[0]
      }
      return notification
    }
  }
}

export { NotificationGetters, getters }
