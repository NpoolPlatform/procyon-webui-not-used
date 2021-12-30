import { notifyType } from 'src/notify/notify'

export interface NotifyMessage {
  type: notifyType
  message: string
  caption: string
}

export interface InnerLoadingSate {
  key: string
  value: boolean
}

export enum InnerLoadingTarget {
  ChangePasswordEmailSendCodeButton = 'CHANGE_PASSWORD_EMAIL_SEND_CODE_BUTTON',
  ChangePasswordPhoneSendCodeButton = 'CHANGE_PASSWORD_PHONE_SEND_CODE_BUTTON',
  RegisterEmailSendCodeButton = 'REGISTER_EMAIL_SEND_CODE_BUTTON',
  RegisterPhoneSendCodeButton = 'REGISTER_PHONE_SEND_CODE_BUTTON',
  ForgetPasswordEmailSendCodeButton = 'FORGET_PASSWORD_EMAIL_SEND_CODE_BUTTON',
  ForgetPasswordPhoneSendCodeButton = 'FORGET_PASSWORD_PHONE_SEND_CODE_BUTTON',
  EnableEmailSendCodeButton = 'ENABLE_EMAIL_SEND_CODE_BUTTON',
  EnablePhoneSendCodeButton = 'ENABLE_PHONE_SEND_CODE_BUTTON',
  UpdateEmailSendCodeOldButton = 'UPDATE_EMAIL_SEND_CODE_OLD_BUTTON',
  UpdatePhoneSendCodeOldButton = 'UPDATE_PHONE_SEND_CODE_OLD_BUTTON',
  UpdateEmailSendCodeButton = 'UPDATE_EMAIL_SEND_CODE_BUTTON',
  UpdatePhoneSendCodeButton = 'UPDATE_PHONE_SEND_CODE_BUTTON',
  GetPromotionProduct = 'GET_PROMOTION_PRODUCT',
  GetDirectInvitationList = 'GET_DIRECT_INVITATION_LIST'
}
