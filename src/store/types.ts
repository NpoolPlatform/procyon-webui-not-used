import { notifyType } from 'src/notify/notify'

export interface allMessages {
  loadingMessage: string
  successMessage: string
  failMessage: string
  error: string
  type: notifyType
}

export interface RequestInput<T> {
  requestInput: T,
  messages: allMessages
}
