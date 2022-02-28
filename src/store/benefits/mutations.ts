import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { BenefitsState } from './state'
import { Benefit, Commission } from './types'

type BenefitMutations<S = BenefitsState> = {
  [MutationTypes.SetBenefits] (state: S, payload: Array<Benefit>): void
  [MutationTypes.SetCommission] (state: S, payload: Commission): void
}

const mutations: MutationTree<BenefitsState> & BenefitMutations = {
  [MutationTypes.SetBenefits] (state: BenefitsState, payload: Array<Benefit>) {
    state.Benefits = payload
  },
  [MutationTypes.SetCommission] (state: BenefitsState, payload: Commission) {
    state.Commission = payload.Amount
  }
}

export { BenefitMutations, mutations }
