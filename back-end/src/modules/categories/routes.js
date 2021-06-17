import { lazy } from 'react'

export default [

    {
        path: '/categories',
        exact: true,
        auth: true,
        component: lazy(() => import('./pages/list')),
    }
]