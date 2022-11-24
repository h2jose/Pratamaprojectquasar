
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/track', component: () => import('pages/Trackkurir.vue') },
      { path: '/setting', component: () => import('pages/Setting.vue') },
      { path: '/cart', component: () => import('pages/Keranjang.vue') },
      { path: '/detailterlaris', component: () => import('pages/DetailProdukterlaris.vue') },
      { path: '/detailcategory/:id', component: () => import('pages/DetailCategory.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
