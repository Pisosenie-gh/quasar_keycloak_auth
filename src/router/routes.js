
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/admin', component: () => import('pages/admin/Index'), meta: { requireLogin: true } },
      { path: '/response', component: () => import('pages/Response'), meta: { requireLogin: true } },
      { path: '/request', component: () => import('pages/Request'), meta: { requireLogin: true } }
    ]
  },
  {
    name: 'LoginIn',
    path: '/login',
    component: () => import('src/pages/Auth.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
