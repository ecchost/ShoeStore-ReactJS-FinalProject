import { lazy } from 'react'

export default [

    // Auth

    {
        path: '/login',
        exact: true,
        component: lazy(() => import('./pages/login')),
    },
    {
        path: '/register',
        exact: true,
        component: lazy(() => import('./pages/login')),
    }
]