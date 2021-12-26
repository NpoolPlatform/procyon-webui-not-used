import { FontFamily } from './types'

interface StyleState {
  fontStyle: FontFamily,
  showEmail: boolean,
  showPhone: boolean
}

function state (): StyleState {
  return {
    fontStyle: 'font-family: "Noto Sans JP"',
    showEmail: true,
    showPhone: false
  }
}

export { state, StyleState }
