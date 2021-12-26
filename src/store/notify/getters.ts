import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { NotifyState } from './state'
import { allMessages } from 'src/store/types'

type NotifyGetters = {
  getNotifyLoading (state: NotifyState): boolean
  getNotifyMessages (state: NotifyState): Array<allMessages>
  getNotifyLoadingMessage (state: NotifyState): string
}

const getters: GetterTree<NotifyState, RootState> & NotifyGetters = {
  getNotifyLoading: (state: NotifyState): boolean => state.loading,
  getNotifyMessages: (state: NotifyState): Array<allMessages> => state.notifyMessages,
  getNotifyLoadingMessage: (state: NotifyState): string => state.loadingMessage
}

export { NotifyGetters, getters }
