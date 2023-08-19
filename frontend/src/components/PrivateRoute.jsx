import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
//hooks
import { useTheme } from '../hooks/useTheme'
import useAuthStatus from '../hooks/useAuthStatus'
//components
import RingLoader from 'react-spinners/RingLoader'

//preventing not logged in user to go tocertain page that are accessible only to logged in user
function PrivateRoute() {
	const { color } = useTheme()
	const { loggedIn, checkingStatus } = useAuthStatus()
	if (checkingStatus) {
		// Render a loading spinner or component while authentication state is being determined
		return <RingLoader color={color} size='300px' className='mx-auto my-5' />
	}

	return loggedIn ? <Outlet /> : <Navigate to='/signin' />
}

export default PrivateRoute
