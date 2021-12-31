import { boot } from 'quasar/wrappers'
import { createI18n, I18n } from 'vue-i18n'

import messages from 'src/i18n'

const datetimeFormats = {}
const numberFormats = {}

let i18n: I18n
export default boot(({ app }) => {
  i18n = createI18n({
    locale: 'en-US',
    messages,
    datetimeFormats,
    numberFormats
  })

  // Set i18n instance on app
  app.use(i18n)
})

export function useI18n () {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { t, te, tm, rt, d, n, ...globalApi } = i18n.global

  return {
    t: t.bind(i18n),
    te: te.bind(i18n),
    tm: tm.bind(i18n),
    rt: rt.bind(i18n),
    d: d.bind(i18n),
    n: n.bind(i18n),
    ...globalApi
  }
}
