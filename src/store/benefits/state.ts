import { Benefit, Commission } from './types'

interface BenefitsState {
  Benefits: Array<Benefit>
  Commission: Commission
}

function state (): BenefitsState {
  return {
    Benefits: [],
    Commission: {} as Commission
  }
}

export {
  state,
  BenefitsState
}
