import NotFoundPage from './pages/notfoundpage/NotFoundPage'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import Register from './pages/register/Register'
const routers = [
    {
        path: '/',
        exact: true,
        main: ({ history, location }) => <HomePage history={history} location={location} />
    },
    {
        path: '/login',
        exact: false,
        main: () => <LoginPage />
    },
    {
        path: '/register',
        exact: false,
        main: () => <Register />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }

]

export default routers;