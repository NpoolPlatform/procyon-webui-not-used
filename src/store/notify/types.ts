import { notifyType } from 'src/notify/notify'

export interface NotifyMessage {
  type: notifyType
  message: string
  caption: string
}
