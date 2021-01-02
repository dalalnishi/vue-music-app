import SignUp from '../components/Authentication/SignUp';
import SignIn from '../components/Authentication/SignIn';
import Dashboard from '../components/Dashboard/Dashboard';
import UserLikes from '../components/UserActions/UserLikes';

export const routes = [
    {
        path: '/',
        component: SignIn,
        name: 'SignIn',
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/likes',
        name: 'Likes',
        component: UserLikes,
        meta: {
            requiresAuth: true
        }
    }
];