import { Navigate, Outlet } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'

//preventing logged in user to go to Log in or Sign up page while he/she is logged in
function ProtectedRoute() {
	const { loggedIn } = useAuthStatus()
	return !loggedIn ? <Outlet /> : <Navigate to='/' />
}
export default ProtectedRoute
