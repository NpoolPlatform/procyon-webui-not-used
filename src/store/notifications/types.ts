import { ModuleKey, Type } from './const'

interface Message {
  Title?: string
  Message?: string
  Description?: string
  Popup?: boolean
  Type?: Type
}

interface Notification {
  ModuleKey: ModuleKey
  ID: string
  Message: Message
}

interface PopNotification {
  ModuleKey: ModuleKey
  ID: string
}

interface ReqMessage {
  ModuleKey: ModuleKey
  Waiting?: Message
  Info?: Message
  Error?: Message
}

export {
  Notification,
  PopNotification,
  ReqMessage,
  Message
}
