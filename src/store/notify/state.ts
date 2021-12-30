import { NotifyMessage } from 'src/store/notify/types'

interface NotifyState {
  loadingContent: string
  notifyMessages: Array<NotifyMessage>
  loading: boolean
  innerLoading: Map<string, boolean>
}

function state (): NotifyState {
  return {
    loadingContent: '',
    notifyMessages: [],
    loading: false,
    innerLoading: new Map<string, boolean>()
  }
}

export { state, NotifyState }
