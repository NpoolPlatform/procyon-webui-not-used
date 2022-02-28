import { Benefit } from './types'

interface BenefitsState {
  Benefits: Array<Benefit>
  Commission: number
}

function state (): BenefitsState {
  return {
    Benefits: [],
    Commission: 0
  }
}

export {
  state,
  BenefitsState
}
