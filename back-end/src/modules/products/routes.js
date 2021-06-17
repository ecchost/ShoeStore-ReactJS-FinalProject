import { lazy } from 'react'

export default [

    {
        path: '/products',
        exact: true,
        auth: true,
        component: lazy(() => import('./pages/list')),
    }
]