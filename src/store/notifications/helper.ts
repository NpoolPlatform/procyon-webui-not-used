import { Message, Notification, PopNotification } from './types'
import { ModuleKey, Type } from './const'
import { v4 as uuidv4 } from 'uuid'
import { Notify } from 'quasar'

const notificationPush = (key: ModuleKey, message: Message): Notification => {
  return {
    ModuleKey: key,
    ID: uuidv4(),
    Message: message
  }
}

const notificationPop = (notification: Notification): PopNotification => {
  return {
    ModuleKey: notification.ModuleKey,
    ID: notification.ID
  }
}

const success = (notification: Notification): void => {
  Notify.create({
    type: 'positive',
    message: notification.Message.Title
  })
}

const mergeMessage = (notification: Notification) => {
  if (notification.Message.Message) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return notification.Message.Message + '(' + notification.Message.Description + ')'
  }
  return notification.Message.Description
}

const fail = (notification: Notification): void => {
  Notify.create({
    type: 'negative',
    message: notification.Message.Title,
    caption: mergeMessage(notification)
  })
}

const warning = (notification: Notification): void => {
  Notify.create({
    type: 'warning',
    message: notification.Message.Title,
    caption: mergeMessage(notification)
  })
}

const info = (notification: Notification): void => {
  Notify.create({
    type: 'info',
    message: notification.Message.Title,
    caption: mergeMessage(notification)
  })
}

const notify = (notification: Notification) => {
  if (!notification.Message.Popup) {
    return
  }
  switch (notification.Message.Type) {
    case Type.Success:
      success(notification)
      break
    case Type.Error:
      fail(notification)
      break
    case Type.Info:
      info(notification)
      break
    case Type.Warning:
      warning(notification)
      break
    case Type.Waiting:
      return Notify.create({
        type: 'ongoing',
        message: notification.Message.Message
      })
  }
}

export {
  notificationPush,
  notificationPop,
  notify
}
