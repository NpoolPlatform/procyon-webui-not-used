import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { SHA256 } from 'crypto-js'
import { NotifyMessage } from 'src/store/notify/types'
import { notifyType } from 'src/notify/notify'
import { UserBasicInfo } from 'src/store/users/types'
import { RequestInput } from 'src/store/types'
import { SendEmailRequest } from 'src/store/verify/types'
import { useQuasar } from 'quasar'
import { useRouter } from 'src/router'

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

const numberRegex = /^[0-9]+.?[0-9]*$/
const wordRegex = /^[a-zA-Z]+$/
const phoneRegex = /^\d+$/
const emailRegex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

export const isValidPassword = (password: string): boolean => {
  if (password.length >= 21 || password.length < 8) {
    return false
  }

  if (password.indexOf(' ') !== -1) {
    return false
  }

  if (numberRegex.test(password)) {
    return false
  }

  if (wordRegex.test(password)) {
    return false
  }

  return true
}

export const isValidUsername = (username: string): boolean => {
  if (username.length > 32 || username.length < 4) {
    return false
  }

  if (username.indexOf(' ') !== -1) {
    return false
  }

  if (numberRegex.test(username)) {
    return false
  }
  return true
}

export const isValidEmail = (email: string): boolean => {
  if (!emailRegex.test(email)) {
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
  if (phone.length > 11 || phone === '') {
    return false
  }

  if (!phoneRegex.test(phone)) {
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

export const GenerateSendEmailRequest = (locale: string, userBasicInfo: UserBasicInfo, requestInput: RequestInput<SendEmailRequest>): RequestInput<SendEmailRequest> => {
  let username = ''
  if (locale === 'en-US') {
    if (userBasicInfo.FirstName !== '') {
      username = userBasicInfo.FirstName
    }
  } else {
    if (userBasicInfo.LastName !== '') {
      username = userBasicInfo.LastName
    }
  }

  requestInput.requestInput.Username = username
  return requestInput
}

export const ThrottleDelay = 1000

export const CheckLogined = (): boolean => {
  const q = useQuasar()
  const $q = useQuasar()
  const router = useRouter()
  if (!q.cookies.has('UserID') && !q.cookies.has('AppSession')) {
    $q.notify({
      type: 'negative',
      message: 'Please login firstly!'
    })
    void router.push('/')
    return false
  }
  return true
}
