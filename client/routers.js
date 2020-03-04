import NotFoundPage from './pages/notfoundpage/NotFoundPage'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'

const routers = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/login',
        exact: false,
        main: () => <LoginPage />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }
       
]

export default routers;