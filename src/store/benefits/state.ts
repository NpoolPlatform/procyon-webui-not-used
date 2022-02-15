import { Benefit } from './types'

interface BenefitsState {
  Benefits: Array<Benefit>
}

function state (): BenefitsState {
  return {
    Benefits: []
  }
}

export {
  state,
  BenefitsState
}
