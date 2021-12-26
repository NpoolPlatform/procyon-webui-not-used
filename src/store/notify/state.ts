import { NotifyMessage } from 'src/store/notify/types'

interface NotifyState {
  loadingContent: string
  notifyMessages: Array<NotifyMessage>
  loading: boolean
}

function state (): NotifyState {
  return {
    loadingContent: '',
    notifyMessages: [],
    loading: false
  }
}

export { state, NotifyState }
