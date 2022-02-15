import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { BenefitsState } from './state'
import { Benefit } from './types'

type BenefitMutations<S = BenefitsState> = {
  [MutationTypes.SetBenefits] (state: S, payload: Array<Benefit>): void
}

const mutations: MutationTree<BenefitsState> & BenefitMutations = {
  [MutationTypes.SetBenefits] (state: BenefitsState, payload: Array<Benefit>) {
    state.Benefits = payload
  }
}

export { BenefitMutations, mutations }
