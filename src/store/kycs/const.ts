enum ImageType {
  Front = 'Front',
  Back = 'Back',
  Handing = 'Handing'
}

enum API {
  GET_KYC_INFO = '/kyc-management/v1/get/kyc/by/userid',
  GET_KYC_IMAGE = '/kyc-management/v1/get/kyc/image',
  UPLOAD_KYC_IMAGE = '/kyc-management/v1/upload/kyc/image'
}

enum State {
  NotVerified = 'not-verified',
  Wait = 'wait',
  Verified = 'verified',
  Rejected = 'rejected'
}

export {
  ImageType,
  API,
  State
}
