import { Link, NavLink, useNavigate } from 'react-router-dom'
//hooks
import { useTheme } from '../hooks/useTheme'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
//bootstrap components
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Button } from 'react-bootstrap'
//components
import Search from './Search'
import { toast } from 'react-toastify'
import Avatar from './Avatar'

function NavMenu() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { color } = useTheme()
	const { user: authUser } = useSelector(state => state.auth)

	const handleLogOut = () => {
		//dispatch logout
		dispatch(logout())
		toast.info('You are logged out.')
		setTimeout(() => navigate('/'), 100)
	}

	return (
		<Navbar
			expand={'md'}
			className=' mb-3 navmenu'
			style={{ background: color }}
		>
			<Container fluid>
				<Link to='/'>
					<h1>RecipeBook</h1>
				</Link>
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
				<Navbar.Offcanvas
					style={{ background: color }}
					id={`offcanvasNavbar-expand-md`}
					aria-labelledby={`offcanvasNavbarLabel-expand-md`}
					placement='end'
					className='d-flex justify-content-center align-items-end'
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title
							id={`offcanvasNavbarLabel-expand-md`}
						></Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Search />
						<Nav className='justify-content-end flex-grow-1 pe-3'>
							<NavLink
								className='regular-link'
								to='/'
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: 'fit-content',
									height: '3em',
									backgroundColor: color,
									margin: '0 0.5em',
								}}
							>
								Home
							</NavLink>
							{authUser && (
								<NavLink
									className='regular-link'
									to='/create'
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: 'fit-content',
										height: '3em',
										backgroundColor: color,
										margin: '0 0.5em',
									}}
								>
									Create
								</NavLink>
							)}
							{!authUser && (
								<NavLink
									className='regular-link'
									to='/register'
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: 'fit-content',
										height: '3em',
										backgroundColor: color,

										margin: '0 0.5em',
									}}
								>
									Sign up
								</NavLink>
							)}
							{!authUser && (
								<NavLink
									className='regular-link'
									to='/login'
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: 'fit-content',
										height: '3em',
										backgroundColor: color,
										margin: '0 0.5em',
									}}
								>
									Sign in
								</NavLink>
							)}
							{authUser && (
								<Button
									onClick={handleLogOut}
									variant='outline-success'
									style={{
										margin: '0 0.5em',
										backgroundColor: color,
										width: 'fit-content',
									}}
								>
									Log out
								</Button>
							)}
							{authUser && (
								<NavLink
									style={({ isActive }) => ({
										color: isActive ? `${color} !important` : '#fff !important',
										background: isActive
											? '#fff !important'
											: `${color} !important`,
									})}
									className='avatar-nav'
									to={`/profile/${authUser._id}`}
								>
									<Avatar style={{ width: '100%', color: color }} />
								</NavLink>
							)}{' '}
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}
export default NavMenu
