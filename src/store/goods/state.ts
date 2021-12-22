import { GoodDetail } from './types'

interface GoodState {
  goods: GoodDetail[]
  loading: boolean
  error: string
}

function state (): GoodState {
  return {
    goods: [],
    loading: false,
    error: ''
  }
}

export { state, GoodState }
