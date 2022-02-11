import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  Router
} from 'vue-router'
import { RootState, Store } from '../store'
import routes from './routes'
import { Cookies } from 'quasar'
import { api } from 'src/boot/axios'
import { LoginedResponse, UserURLPath } from 'src/store/users/types'
import { MutationTypes as UserMutationTypes } from 'src/store/users/mutation-types'
import { AxiosResponse } from 'axios'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

let myRouter: Router

export const useRouter = () => {
  return myRouter
}

export default route<RootState>(function ({ store /*, ssrContext */ }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  myRouter = createRouter({
    scrollBehavior: () => ({
      left: 0,
      top: 0
    }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  const myStore = store as Store
  myRouter.beforeEach((to, _, next) => {
    if (!to.meta || !to.meta.needLogined) {
      next()
    }

    if (!myStore.getters.getUserLogined) {
      const userID = Cookies.get('X-User-ID')
      const token = Cookies.get('X-App-Login-Token')

      if (userID && token) {
        const headers = api.defaults.headers as Record<string, string>
        headers['X-User-ID'] = userID
        headers['X-App-Login-Token'] = token
        api.post<unknown, AxiosResponse<LoginedResponse>>(UserURLPath.LOGINED)
          .then((resp: AxiosResponse<LoginedResponse>) => {
            myStore.commit(UserMutationTypes.SetUserInfo, resp.data.Info)
            myStore.commit(UserMutationTypes.SetUserLogined, true)
            myStore.commit(UserMutationTypes.SetLoginVerify, true)
            next()
          }).catch(() => {
            next({ path: '/login', replace: true })
          })
        return
      }

      next({ path: '/login', replace: true })
      return
    }

    next()
  })

  return myRouter
})
