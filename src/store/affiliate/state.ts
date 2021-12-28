import { Invitation } from './types'

interface AffiliateState {
  invitations: Array<Invitation>
}

function state (): AffiliateState {
  return {
    invitations: []
  }
}

export { state, AffiliateState }
