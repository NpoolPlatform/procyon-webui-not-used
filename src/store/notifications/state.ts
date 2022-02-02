import { Notification } from './types'

interface NotificationState {
  Notifications: Map<string, Array<Notification>>
}

function state (): NotificationState {
  return {
    Notifications: new Map<string, Array<Notification>>()
  }
}

export { state, NotificationState }
