import Main from '@/view/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: 'home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true
        },
        component: () => import('@/view/home')
      }
    ]
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      icon: 'md-settings',
      title: '系统管理'
    },
    component: Main,
    children: [
      {
        path: 'auth',
        name: 'auth',
        meta: {
          icon: 'md-unlock',
          title: '角色管理'
        },
        component: () => import('@/view/users/auth.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          icon: 'md-people',
          title: '用户管理'
        },
        component: () => import('@/view/users/user.vue')
      },
      {
        path: 'manger',
        name: 'manger',
        meta: {
          icon: 'md-person',
          title: '后台账户管理'
        },
        component: () => import('@/view/users/manger.vue')
      }
    ]
  },
  {
    path: '/ads',
    name: 'ads',
    redirect: '/query',
    component: Main,
    meta: {
      icon: 'ios-megaphone',
      title: '广告管理'
    },
    children: [
      {
        path: 'private-custom',
        name: 'private-custom',
        meta: {
          icon: 'md-pricetag',
          title: '私人定制'
        },
        component: () => import('@/view/ads/private-custom.vue')
      },
      {
        path: 'audit',
        name: 'audit',
        meta: {
          icon: 'md-checkbox-outline',
          title: '审核管理'
        },
        component: () => import('@/view/ads/audit.vue')
      },
      {
        path: 'cost',
        name: 'cost',
        meta: {
          icon: 'logo-usd',
          title: '费用结算管理'
        },
        component: () => import('@/view/ads/cost.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
