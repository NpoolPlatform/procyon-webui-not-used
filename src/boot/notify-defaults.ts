import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

export default boot((/* { app, router, ... } */) => {
  Notify.setDefaults({
    position: 'top-right',
    timeout: 3000,
    textColor: 'white'
  })
})
