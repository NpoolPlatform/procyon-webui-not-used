export interface GoogleAuthenticationInfo {
  qrCodeURL: string
  secret: string
}

export interface SendEmailRequest {
  AppID?: string
  Email: string
  Intention?: string
  Lang: string
  Username?: string
  ItemTarget: string
}

export interface SendEmailResponse {
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

export interface VerifyCodeWithUserIDRequest {
  UserID?: string
  AppID?: string
  Param: string
  Code: string
  VerifyType?: string
}

export interface VerifyCodeWithUserIDResponse {
  Info: string
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
  SEND_EMAIL = '/verification-door/v1/send/email',
  GET_QRCODE_URL = '/verification-door/v1/get/qrcode/url',
  SEND_SMS = '/verification-door/v1/send/sms',
  VERIFY_CODE_WITH_USERID = '/verification-door/v1/verify/code/with/userid',
  VERIFY_GOOGLE_AUTHENTICATION = '/verification-door/v1/verify/google/auth',
  SEND_USER_SITE_CONTACT_EMAIL = '/verification-door/v1/send/user/site/contact/email'
}
