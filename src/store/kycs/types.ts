import { ImageType, State } from './const'

interface KYCInfo {
  ID?: string
  AppID?: string
  UserID?: string
  CardType?: string
  CardID?: string
  FrontCardImg?: string
  BackCardImg?: string
  UserHandingCardImg?: string
  CreateAt?: number
}

interface KYC {
  Kyc?: KYCInfo
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

interface CreateKYCRequest {
  Info: KYCInfo
}

interface CreateKYCResponse {
  Info: KYC
}

interface UploadKYCImageRequest {
  AppID?: string
  UserID?: string
  ImageType: ImageType
  ImageBase64: string
}

interface UploadKYCImageResponse {
  Info: string
}

interface GetKYCImageRequest extends KYCImage {
  ImageS3Key?: string
}

interface GetKYCImageResponse {
  Info: string
}

export {
  KYC,
  KYCInfo,
  GetKYCResponse,
  KYCImage,
  CreateKYCRequest,
  CreateKYCResponse,
  UploadKYCImageRequest,
  UploadKYCImageResponse,
  GetKYCImageRequest,
  GetKYCImageResponse
}
