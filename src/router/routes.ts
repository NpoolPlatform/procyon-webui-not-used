import { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    needLogined?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/HomePage.vue')
      },
      {
        path: 'faq',
        component: () => import('pages/Faq.vue')
      },
      {
        path: 'legal',
        component: () => import('pages/Legal.vue')
      },
      {
        path: 'login',
        component: () => import('pages/Login.vue')
      },
      {
        path: 'register',
        component: () => import('pages/Register.vue')
      },
      {
        path: 'forget',
        component: () => import('pages/Forget.vue')
      },
      {
        path: 'change/password',
        component: () => import('pages/ChangePassword.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'update/email',
        component: () => import('pages/UpdateEmail.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'update/mobile',
        component: () => import('pages/UpdateMobile.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'update/google',
        component: () => import('pages/UpdateGoogle.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'verify/google',
        component: () => import('pages/VerifyGoogle.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'dashboard',
        component: () => import('pages/DashBoard.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'wallet',
        component: () => import('pages/Wallet.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'account',
        component: () => import('pages/Account.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'affiliate',
        component: () => import('pages/Affiliate.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'notice',
        component: () => import('pages/Notice.vue')
      },
      {
        path: 'security',
        component: () => import('pages/Security.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'contact',
        component: () => import('pages/Contact.vue')
      },
      {
        path: 'kyc',
        component: () => import('pages/KYC.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'purchase',
        component: () => import('pages/Purchase.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'payment',
        component: () => import('pages/Payment.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'add/withdraw/address',
        component: () => import('pages/AddWithdrawAddress.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'withdraw',
        component: () => import('pages/Withdraw.vue'),
        meta: {
          needLogined: true
        }
      },
      {
        path: 'remainder',
        component: () => import('pages/Remainder.vue'),
        meta: {
          needLogined: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
