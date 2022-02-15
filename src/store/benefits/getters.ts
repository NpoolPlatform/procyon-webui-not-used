import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { BenefitsState } from './state'
import { Benefit } from './types'

type BenefitGetters = {
  getBenefits (state: BenefitsState): Array<Benefit>
}

const getters: GetterTree<BenefitsState, RootState> & BenefitGetters = {
  getBenefits: (state: BenefitsState): Array<Benefit> => state.Benefits
}

export { BenefitGetters, getters }
