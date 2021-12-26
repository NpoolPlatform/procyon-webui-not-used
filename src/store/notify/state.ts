import { allMessages } from 'src/store/types'

interface NotifyState {
  loadingMessage: string
  notifyMessages: Array<allMessages>
  loading: boolean
}

function state (): NotifyState {
  return {
    loadingMessage: '',
    notifyMessages: [],
    loading: false
  }
}

export { state, NotifyState }
