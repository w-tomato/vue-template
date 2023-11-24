import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import mall from '@/mall/index.vue'

/* Router Modules */
// import componentsRouter from './modules/components'

/**
 * 注意：只有当路由的 children.length >= 1 时，子菜单才会显示
 * 详细请参阅：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 * hidden: true 如果设置为 true，该项将不会显示在侧边栏中（默认为 false）
 * alwaysShow: true 如果设置为 true，将始终显示根菜单
 *                            如果未设置 alwaysShow，当该项有多个子路由时，
 *                            它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect 如果设置为 noRedirect，将不会在面包屑中重定向
 * name:'router-name' name 用于 <keep-alive>（必须设置！！！）
 * meta: {
 *     roles: ['admin', 'editor'] 控制页面角色（可以设置多个角色）
 *     title: 'title' 在侧边栏和面包屑中显示的名称（建议设置）
 *     icon: 'svg-name'/'el-icon-x' 在侧边栏中显示的图标
 *     noCache: true 如果设置为 true，该页面将不会被缓存（默认为 false）
 *     affix: true 如果设置为 true，标签将固定在标签视图中
 *     breadcrumb: false 如果设置为 false，该项将在面包屑中隐藏（默认为 true）
 *     activeMenu: '/example/list' 如果设置了路径，侧边栏将突出显示设置的路径
 * }
 */

/**
 * constantRoutes
 * 不需要权限要求的基本页面
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: mall,
    redirect: '/ZhaoDongMall',
    children: [
      {
        path: '/ZhaoDongMall',
        name: 'ZhaoDongMall',
        component: () => import('@/views/mall/index'),
        meta: { title: 'ZhaoDongMall', icon: 'dashboard' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [{
      path: 'index',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard', roles: ['admin'] }
    }]
  },
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  {
    path: '/product',
    component: Layout,
    redirect: '/product/index',
    children: [{
      path: 'index',
      name: 'product',
      component: () => import('@/views/product/index.vue'),
      meta: { title: 'product', icon: 'link', roles: ['admin'] }
    }]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link', roles: ['admin'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
