import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
  CommitOptions,
  DispatchOptions,
  ActionContext,
  MutationTree
} from 'vuex'

// ########### define your self store #################
// 1 import your store modules
import {
  user,
  UserState,
  UserMutations,
  UserActions,
  UserGetters
} from './users'

import {
  goods,
  GoodState,
  GoodMutations,
  GoodActions,
  GoodGetters
} from './goods'

import {
  order,
  OrderState,
  OrderActions,
  OrderGetters,
  OrderMutations
} from './order'

import {
  kyc,
  KYCState,
  KYCActions,
  KYCGetters,
  KYCMutations
} from './kycs'

import { style, StyleState, StyleMutations, StyleGetters } from './style'

import { notify, NotifyState, NotifyMutations, NotifyGetters } from './notify'
import { verify, VerifyActions, VerifyGetters, VerifyMutations, VerifyState } from 'src/store/verify'

import {
  affiliate,
  AffiliateState,
  AffiliateMutations,
  AffiliateActions,
  AffiliateGetters
} from './affiliate'

import {
  languages,
  LanguagesState,
  LanguageMutations,
  LanguageActions,
  LanguageGetters
} from './lang'

import {
  application,
  ApplicationState,
  ApplicationMutations,
  ApplicationActions,
  ApplicationGetters
} from './application'

// 2 combine your store to root store
export interface RootState {
  user: UserState
  style: StyleState
  goods: GoodState
  notify: NotifyState
  verify: VerifyState
  affiliate: AffiliateState
  order: OrderState
  kyc: KYCState
  languages: LanguagesState
  application: ApplicationState
}

// 3 combine your actions, mutations and getters to root, if have multi use & combin
// for example a & b
type Actions = UserActions & GoodActions & VerifyActions & AffiliateActions & OrderActions & KYCActions & LanguageActions & ApplicationActions
type Mutations = UserMutations & StyleMutations & GoodMutations & NotifyMutations & VerifyMutations & AffiliateMutations & OrderMutations & KYCMutations & LanguageMutations & ApplicationMutations
type Getters = UserGetters & StyleGetters & GoodGetters & NotifyGetters & VerifyGetters & AffiliateGetters & OrderGetters & KYCGetters & LanguageGetters & ApplicationGetters

// 4 attach your module to root
export default store(function (/* { ssrContext } */) {
  const Store = createStore<RootState>({
    modules: {
      user,
      style,
      goods,
      notify,
      verify,
      affiliate,
      order,
      kyc,
      languages,
      application
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store
})

// ########### end define your self store #################

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<RootState>
  }
}

export type AugmentedActionContext<S, R, M extends MutationTree<S>> = {
  commit<k extends keyof M> (
    type: k,
    payload: Parameters<M[k]>[1],
    options?: CommitOptions
  ): ReturnType<M[k]>
} & Omit<ActionContext<S, R>, 'commit'>

// define your store actions, dispatch and getter type
export type Store = Omit<VuexStore<RootState>,
  'getters' | 'commit' | 'dispatch'> & {
  commit<k extends keyof Mutations, P extends Parameters<Mutations[k]>[1]> (
    type: k,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[k]>
} & {
  dispatch<K extends keyof Actions> (
    type: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<RootState>> = Symbol('vuex-key')

export function useStore () {
  return vuexUseStore(storeKey) as Store
}
