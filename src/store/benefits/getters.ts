import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { BenefitsState } from './state'
import { Benefit, Commission } from './types'

type BenefitGetters = {
  getBenefits (state: BenefitsState): Array<Benefit>
  getCommission (state: BenefitsState): Commission
}

const getters: GetterTree<BenefitsState, RootState> & BenefitGetters = {
  getBenefits: (state: BenefitsState): Array<Benefit> => state.Benefits,
  getCommission: (state: BenefitsState): Commission => state.Commission
}

export { BenefitGetters, getters }
