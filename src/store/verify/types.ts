import { ReqMessage } from '../notifications/types'

export interface GoogleAuthenticationInfo {
  OTPAuth?: string
  Secret?: string
}

export interface SendEmailCodeRequest {
  LangID: string
  EmailAddress: string
  UsedFor: string
  ToUsername?: string
}

export interface SendEmailCodeResponse {
  Info: string
}

export interface SendSmsCodeRequest {
  LangID: string
  PhoneNO: string
  UsedFor: string
}

export interface SendSmsCodeResponse {
  Code: number
  Message: string
}

export interface SetupGoogleAuthenticationRequest {
  Message: ReqMessage
}

export interface SetupGoogleAuthenticationResponse {
  OTPAuth: string
  Secret: string
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
  Code: string
}

export interface VerifyGoogleAuthenticationCodeResponse {
  Code: number
  Message: string
}

export interface DisableState {
  key: string,
  value: boolean
}

export interface TextState {
  key: string
  value: string
}

export interface ContactByEmailRequest {
  UsedFor: string
  Sender: string
  Subject: string
  Body: string
  SenderName: string
}

export interface ContactByEmailResponse {
  Info: string
}

export enum VerifyURLPath {
  SEND_EMAIL = '/third-gateway/v1/send/email/code',
  SETUP_GOOGLE_AUTHENTICATION = '/third-gateway/v1/setup/google/authentication',
  SEND_SMS = '/third-gateway/v1/send/sms/code',
  VERIFY_EMAIL_CODE = '/third-gateway/v1/verify/email/code',
  VERIFY_GOOGLE_AUTHENTICATION = '/third-gateway/v1/verify/google/authentication',
  CONTACT_BY_EMAIL = '/third-gateway/v1/contact/by/email'
}
