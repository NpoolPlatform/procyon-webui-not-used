enum ImageType {
  Front = 'Front',
  Back = 'Back',
  Handing = 'Handing'
}

enum API {
  GET_KYC_INFO = '/cloud-hashing-apis-v2/v1/get/kyc/by/user',
  GET_KYC_IMAGE = '/kyc-management/v1/get/kyc/image',
  UPLOAD_KYC_IMAGE = '/kyc-management/v1/upload/kyc/image',
  CREATE_KYC = '/cloud-hashing-apis-v2/v1/create/kyc'
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
