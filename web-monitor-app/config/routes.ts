export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/',
        redirect: '/project'
      },
      {
        path: '/project',
        component: '@/layouts/projectLayout',
        routes: [
          {
            path: '/project',
            component: '@/pages/Project/index',
          },
          {
            path: '/project/detail',
            component: '@/pages/Project/Detail/index',
          },
          {
            path: '/project/record',
            component: '@/pages/Project/Record/index',
          },
        ]
      },
    ]
  },
]