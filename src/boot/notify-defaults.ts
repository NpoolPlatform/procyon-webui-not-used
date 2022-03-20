import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

export default boot((/* { app, router, ... } */) => {
  Notify.setDefaults({
    color: 'white',
    timeout: 10000,
    position: 'bottom-right'
  })
})
