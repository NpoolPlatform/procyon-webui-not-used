import { Notify } from 'quasar'
import { NotifyMessage } from 'src/store/notify/types'

export type notifyType = 'positive' | 'negative' | 'warning' | 'info' | ''

interface notifyProps {
  type: notifyType
  message: string
  caption?: string
}

export type notifyCallback = (props: notifyProps) => void

const waiting = (msg: string): notifyCallback => {
  return Notify.create({
    type: 'ongoing',
    message: msg
  })
}

// demo
// const wt = waiting('xx')
// wt({ type: 'positive', message: 'succ' })
// wt({ type: 'negative', message: 'fail' })

const success = (msg: string): void => {
  Notify.create({
    type: 'positive',
    message: msg
  })
}

const fail = (msg: string, caption: string): void => {
  Notify.create({
    type: 'negative',
    message: msg,
    caption: caption
  })
}

const hint = (msg: string): void => {
  Notify.create({
    type: 'warning',
    message: msg
  })
}

const notify = (message: NotifyMessage): void => {
  switch (message.type) {
    case 'positive':
    case 'warning':
    case 'info':
      Notify.create({
        type: message.type,
        message: message.message
      })
      break
    case 'negative':
      fail(message.message, message.caption)
      break
    default:
      break
  }
}

export { waiting, success, fail, hint, notify }
