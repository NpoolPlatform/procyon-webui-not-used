import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
// import { MutationTypes } from './mutation-types'
import { UserMutations } from './mutations'
import { UserState } from './state'
// import { post } from 'src/boot/axios'
// import { AxiosResponse } from 'axios'
// import { UserURLPath } from './types'

// use public api
interface UserActions {
  [ActionTypes.GetUser] (
    { commit }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>
  ): void,
}

const actions: ActionTree<UserState, RootState> = {
  // [ActionTypes.GetUser] ({ commit }) {
  //   post(UserURLPath.GET_USER_DETAIL, {}).then( resp => {}).catch(err => {})
  // }
}

export { actions, UserActions }
