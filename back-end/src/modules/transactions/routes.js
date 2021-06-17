import { lazy } from 'react'

export default [

    {
        path: '/transactions',
        exact: true,
        auth: true,
        component: lazy(() => import('./pages/list')),
    }
]