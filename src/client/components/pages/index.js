import Home, { homeFetch } from './Home/Home.jsx';
import Login, { loginFetch } from './Login/Login.jsx';
import Dashboard, { dashboardFetch } from './Dashboard/Dashboard.jsx';
import Profile, { profileFetch } from './Profile/Profile.jsx';
import Conversation, {
    conversationFetch
} from './Conversation/Conversation.jsx';

const fetchFunctions = {
    home: homeFetch,
    login: loginFetch,
    dashboard: dashboardFetch,
    profile: profileFetch,
    conversation: conversationFetch
};

export default {
    fetchFunctions,
    Home,
    Login,
    Dashboard,
    Profile,
    Conversation
};
