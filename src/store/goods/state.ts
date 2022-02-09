import { Good } from './types'

interface GoodState {
  goods: Array<Good>
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
