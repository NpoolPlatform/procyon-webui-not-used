import { Application } from './types'

interface ApplicationState {
  Application?: Application
}

function state (): ApplicationState {
  return {}
}

export {
  state,
  ApplicationState
}
