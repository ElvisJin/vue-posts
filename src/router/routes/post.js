export default [
  {
    path: '/detail',
    name: 'post-detail',
    component: () =>
      import('@/components/PostDetail.vue'),
  },
  {
    path: '/edit',
    name: 'post-edit',
    component: () => 
      import('@/components/PostEdit.vue'),
  },
  {
    path: '/new',
    name: 'post-new',
    component: () =>
      import('@/components/PostEdit.vue'),
  }
]
