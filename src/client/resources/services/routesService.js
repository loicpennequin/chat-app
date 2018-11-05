import Pages from './../../components/pages/index.js';

const { Home, Login, Dashboard, Profile, Conversation, fetchFunctions } = Pages;
const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        dataFetchKey: 'home',
        authLevel: 'public',
        fetchFn: fetchFunctions.home
    },
    {
        path: '/login',
        exact: true,
        component: Login,
        dataFetchKey: 'login',
        authLevel: 'public',
        fetchFn: fetchFunctions.login
    },
    {
        path: '/dashboard',
        exact: true,
        component: Dashboard,
        dataFetchKey: 'dashboard',
        authLevel: 'private',
        fetchFn: fetchFunctions.dashboard
    },
    {
        path: '/profile/:id',
        exact: true,
        component: Profile,
        dataFetchKey: 'profile',
        authLevel: 'private',
        fetchFn: fetchFunctions.profile
    },
    {
        path: '/messages/:id',
        exact: true,
        component: Conversation,
        dataFetchKey: 'conversation',
        authLevel: 'private',
        fetchFn: fetchFunctions.conversation
    }
    // {
    //     path: '/',
    //     exact: true,
    //     component: Home,
    //     fetchFn: HomeFetch,
    //     authLevel: 'public'
    // },
    // {
    //     path: '/dashboard',
    //     exact: false,
    //     component: Dashboard,
    //     fetchFn: DashboardFetch,
    //     authLevel: 'private'
    // },
    // {
    //     path: '/login',
    //     exact: true,
    //     component: Login,
    //     fetchFn: LoginFetch,
    //     authLevel: 'public'
    // },
    // {
    //     path: '/profile/:id',
    //     exact: true,
    //     component: Profile,
    //     fetchFn: ProfileFetch,
    //     authLevel: 'private'
    // },
    // {
    //     path: '/latest',
    //     exact: true,
    //     component: Latest,
    //     fetchFn: LatestFetch,
    //     authLevel: 'private'
    // }
];

export default routes;
