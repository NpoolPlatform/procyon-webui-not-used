import { ImageType, State } from './const'

interface KYC {
  ID?: string
  AppID?: string
  UserID?: string
  CardType?: string
  CardID?: string
  FrontCardImg?: string
  BackCardImg?: string
  UserHandlingCardImg?: string
  CreateAt?: number,
  State: State
}

interface GetKYCResponse {
  Info: KYC
}

interface KYCImage {
  ImageType?: ImageType
  URI?: string
  Base64?: string
}

export {
  KYC,
  GetKYCResponse,
  KYCImage
}
