import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { NotifyState } from './state'
import { NotifyMessage } from 'src/store/notify/types'

type NotifyGetters = {
  getLoading (state: NotifyState): boolean
  getNotifyMessages (state: NotifyState): Array<NotifyMessage>
  getLoadingContent (state: NotifyState): string
}

const getters: GetterTree<NotifyState, RootState> & NotifyGetters = {
  getLoading: (state: NotifyState): boolean => state.loading,
  getNotifyMessages: (state: NotifyState): Array<NotifyMessage> => state.notifyMessages,
  getLoadingContent: (state: NotifyState): string => state.loadingContent
}

export { NotifyGetters, getters }