export default [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "landing" */ '@/components/Home.vue'),
  },
]
