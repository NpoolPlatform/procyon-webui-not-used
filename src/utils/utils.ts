import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { SHA256 } from 'crypto-js'
import { NotifyMessage } from 'src/store/notify/types'
import { notifyType } from 'src/notify/notify'

export const TimeStampToDate = (
  timestamp: number,
  format: string,
  lang?: string
): string => {
  switch (lang) {
    case 'en-US':
      return dayjs.unix(timestamp).format(format)
    default:
      return dayjs.unix(timestamp).locale('ja').format(format)
  }
}

export const sha256Password = (password: string): string => {
  return SHA256(password).toString()
}

export const isValidPassword = (password: string): boolean => {
  if (password === '' || password === ' ') {
    return false
  }

  if (password.length >= 21 || password.length < 8) {
    return false
  }

  if (password.indexOf(' ') !== -1) {
    return false
  }

  let reg = /^[0-9]+.?[0-9]*$/
  if (reg.test(password)) {
    return false
  }

  reg = /^[a-zA-Z]+$/
  if (reg.test(password)) {
    return false
  }

  return true
}

export const isValidUsername = (username: string): boolean => {
  if (username === '' || username === ' ') {
    return false
  }

  if (username.length > 32 || username.length < 4) {
    return false
  }

  if (username.indexOf(' ') !== -1) {
    return false
  }

  const reg = /^[0-9]+.?[0-9]*$/
  if (reg.test(username)) {
    return false
  }
  return true
}

export const isValidEmail = (email: string): boolean => {
  if (email == null || email === '') {
    return false
  }
  const regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  if (!regExp.test(email)) {
    return false
  }

  return true
}

export const isValidLoginUsername = (username: string): boolean => {
  if (isValidEmail(username)) {
    return true
  }

  if (isValidUsername(username)) {
    return true
  }

  return false
}

export const isValidPhone = (phone: string): boolean => {
  if (phone == null || phone === '') {
    return false
  }

  if (phone.length > 11) {
    return false
  }

  const regExp = /^\d+$/
  if (!regExp.test(phone)) {
    return false
  }

  return true
}

export const RequestMessageToNotifyMessage = (message: string, caption: string, type: notifyType): NotifyMessage => {
  const notifyMessage: NotifyMessage = {
    type: type,
    message: message,
    caption: caption
  }
  return notifyMessage
}
