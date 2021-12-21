import { FontFamily } from './types'

interface StyleState {
  fontStyle: FontFamily
}

function state (): StyleState {
  return {
    fontStyle: "font-family: 'Noto Sans JP'"
  }
}

export { state, StyleState }
