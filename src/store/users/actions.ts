import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { UserMutations } from './mutations'
import { UserState } from './state'
import { post } from 'src/boot/axios'
import { UserURLPath } from './types'
import { waiting } from 'src/notify/notify'
import { NotifyMessage } from '../types'

// use public api
interface UserActions {
  [ActionTypes.GetUser] ({
    commit
  }: AugmentedActionContext<UserState,
    RootState,
    UserMutations<UserState>>): void

  [ActionTypes.UserLogout] (
    {
      commit
    }: AugmentedActionContext<UserState, RootState, UserMutations<UserState>>,
    payload: NotifyMessage
  ): void
}

const actions: ActionTree<UserState, RootState> = {
  [ActionTypes.UserLogout] ({ commit }, payload: NotifyMessage) {
    const wait = waiting(payload.wait)
    commit(MutationTypes.SetLoading, true)
    post(UserURLPath.LOGOUT, {})
      .then(() => {
        commit(MutationTypes.SetUserLogined, false)
        commit(MutationTypes.SetError, '')
        commit(MutationTypes.SetLoading, false)
        wait({
          type: 'positive',
          message: payload.success
        })
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetError, err)
        commit(MutationTypes.SetLoading, false)
        wait({
          type: 'negative',
          message: payload.fail,
          caption: err.message
        })
      })
  }
}

export { actions, UserActions }
