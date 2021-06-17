import {
    Home,
    Camera,
    Archive,
    Database
} from 'react-feather';

export const Menus = [
    {
        path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: true
    },
    {
        path: '/products', title: 'Products', icon: Camera, type: 'link', badgeType: 'primary', active: false
    },
    {
        path: '/categories', title: 'Categories', icon: Archive, type: 'link', badgeType: 'primary', active: false
    },
    {
        path: '/transactions', title: 'Transactions', icon: Database, type: 'link', badgeType: 'primary', active: false
    }
]

export default Menus
