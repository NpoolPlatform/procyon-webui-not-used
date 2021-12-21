import { Notify } from 'quasar'
import { AxiosError } from 'axios'
import { CommonError } from '../boot/axios'

export const waiting = (msg: string) => {
  Notify.create({
    type: 'ongoing',
    message: msg
  })
}

export const success = (notify: Notify | undefined, msg: string) => {
  if (notify === undefined) {
    Notify.create({
      type: 'positive',
      message: msg
    })
    return
  }

  notify.create({
    type: 'positive',
    message: msg
  })
}

export const fail = (notif: Notify | undefined, msg: string, error: AxiosError<CommonError> | undefined) => {
  const data = error

  if (error === undefined) {
    Notify.create({
      type: 'negative',
      message: msg
    })
    return
  }

  if (notif === undefined) {
    Notify.create({
      type: 'negative',
      message: msg + ': ' + error.message,
      caption: JSON.stringify(data)
    })
    return
  }

  notif.create({
    type: 'negative',
    message: msg + ': ' + error.message,
    caption: JSON.stringify(data)
  })
}

export const hint = (notif: Notify | undefined, msg: string) => {
  if (notif === undefined) {
    Notify.create({
      type: 'warning',
      message: msg
    })
    return
  }

  notif.create({
    type: 'warning',
    message: msg
  })
}

export default { success, fail, waiting, hint }
