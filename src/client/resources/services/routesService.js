import Home, {
    fetchData as HomeFetch
} from './../../components/pages/Home/Home.jsx';
import Dashboard, {
    fetchData as DashboardFetch
} from './../../components/pages/Dashboard/Dashboard.jsx';
import Login, {
    fetchData as LoginFetch
} from './../../components/pages/Login/Login.jsx';
import Profile, {
    fetchData as ProfileFetch
} from './../../components/pages/Profile/Profile.jsx';
import Latest, {
    fetchData as LatestFetch
} from './../../components/pages/Latest/Latest.jsx';
const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        fetchFn: HomeFetch,
        authLevel: 'public'
    },
    {
        path: '/dashboard',
        exact: false,
        component: Dashboard,
        fetchFn: DashboardFetch,
        authLevel: 'private'
    },
    {
        path: '/login',
        exact: true,
        component: Login,
        fetchFn: LoginFetch,
        authLevel: 'public'
    },
    {
        path: '/profile/:id',
        exact: true,
        component: Profile,
        fetchFn: ProfileFetch,
        authLevel: 'private'
    },
    {
        path: '/latest',
        exact: true,
        component: Latest,
        fetchFn: LatestFetch,
        authLevel: 'private'
    }
];

export default routes;
