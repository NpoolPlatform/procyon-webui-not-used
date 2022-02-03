export interface GoogleAuthenticationInfo {
  qrCodeURL: string
  secret: string
}

export interface SendEmailCodeRequest {
  AppID?: string
  UserID?: string
  LangID: string
  EmailAddress: string
  UsedFor: string
  DisplayName?: string
}

export interface SendEmailCodeResponse {
  Info: string
}

export interface SendSmsRequest {
  AppID?: string
  Phone: string
  Lang?: string
  Intention?: string
  ItemTarget: string
}

export interface SendSmsResponse {
  Info: string
}

export interface GetQRCodeURLRequest {
  Username: string
  UserID?: string
  AppID?: string
}

export interface GetQRCodeURLResponse {
  Info: {
    CodeURL: string
    Secret: string
  }
}

export interface VerifyEmailCodeRequest {
  UsedFor: string
  Code: string
}

export interface VerifyEmailCodeResponse {
  Code: number
  Message: string
}

export interface VerifyGoogleAuthenticationCodeRequest {
  UserID?: string
  AppID?: string
  Code: string
  Bind?: boolean
}

export interface VerifyGoogleAuthenticationCodeResponse {
  Info: string
}

export interface DisableState {
  key: string,
  value: boolean
}

export interface TextState {
  key: string
  value: string
}

export interface SendUserSiteContactEmailRequest {
  AppID?: string
  From: string
  To: string
  Text: string
  Subject: string
  Username: string
}

export interface SendUserSiteContactEmailResponse {
  Info: string
}

export enum VerifyURLPath {
  SEND_EMAIL = '/third-gateway/v1/send/email/code',
  GET_QRCODE_URL = '/third-gateway/v1/get/qrcode/url',
  SEND_SMS = '/third-gateway/v1/send/sms/code',
  VERIFY_EMAIL_CODE = '/third-gateway/v1/verify/email/code',
  VERIFY_GOOGLE_AUTHENTICATION = '/third-gateway/v1/verify/google/auth',
  SEND_USER_SITE_CONTACT_EMAIL = '/third-gateway/v1/send/user/site/contact/email'
}
