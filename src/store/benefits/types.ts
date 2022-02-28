import { ReqMessage } from '../notifications/types'

interface Benefit {
  ID: string
  GoodID: string
  OrderID: string
  Amount: number
  CreateAt: number
}

interface GetBenefitsRequest {
  Message: ReqMessage
}

interface GetBenefitsResponse {
  Infos: ReadonlyArray<Benefit>
}

interface GetCommissionRequest {
  Message: ReqMessage
}

interface Commission {
  Amount: number
}

interface GetCommissionResponse {
  Info: Commission
}

export {
  Benefit,
  GetBenefitsRequest,
  GetBenefitsResponse,
  Commission,
  GetCommissionRequest,
  GetCommissionResponse
}
