import { FontFamily } from './types'

interface StyleState {
  fonstStyle: FontFamily
}

function state (): StyleState {
  return {
    fonstStyle: 'font-family: \'Noto Sans JP\''
  }
}

export { state, StyleState }
