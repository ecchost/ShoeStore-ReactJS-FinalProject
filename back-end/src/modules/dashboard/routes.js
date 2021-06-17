import { lazy } from 'react'

export default [

    {
        path: '/',
        exact: true,
        auth: true,
        component: lazy(() => import('./pages/dashboard')),
    },
    {
        path: '/dashboard',
        exact: true,
        auth: true,
        component: lazy(() => import('./pages/dashboard')),
    },
]