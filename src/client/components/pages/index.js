import Home, { homeFetch } from './Home/Home.jsx';
import Login, { loginFetch } from './Login/Login.jsx';
import Dashboard, { dashboardFetch } from './dashboard/dashboard.jsx';
import Profile, { profileFetch } from './profile/profile.jsx';

const fetchFunctions = {
    home: homeFetch,
    login: loginFetch,
    dashboard: dashboardFetch,
    profile: profileFetch
};

export default {
    fetchFunctions,
    Home,
    Login,
    Dashboard,
    Profile
};
