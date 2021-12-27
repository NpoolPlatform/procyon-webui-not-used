import { FontFamily } from './types'

interface StyleState {
  fontStyle: FontFamily,
  showEmail: boolean,
  showPhone: boolean,
  userDialogShow: boolean
}

function state (): StyleState {
  return {
    fontStyle: 'font-family: "Noto Sans JP"',
    showEmail: true,
    showPhone: false,
    userDialogShow: false
  }
}

export { state, StyleState }
