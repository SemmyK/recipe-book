import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
//hooks
import { useTheme } from '../hooks/useTheme'
import useAuthStatus from '../hooks/useAuthStatus'
//bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
//components
import Avatar from '../components/Avatar'
import RecipeList from '../components/RecipeList'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { getUserRecipes } from '../features/recipe/recipeSlice'
import { deleteProfile, getProfile } from '../features/auth/authSlice'

function Profile() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const { loggedIn } = useAuthStatus()
	const { color } = useTheme()
	const { userData, user } = useSelector(state => state.auth)
	const { userRecipes } = useSelector(state => state.recipe)

	useEffect(() => {
		loggedIn && dispatch(getProfile(id))
		dispatch(getUserRecipes(user._id))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, loggedIn, id])

	const handleDelete = async () => {
		dispatch(deleteProfile(id))

		setTimeout(() => navigate('/register'), 2000)
	}

	return (
		loggedIn && (
			<Container className='profile'>
				<Row>
					<Col
						xs={12}
						sm={6}
						md={3}
						className='mx-auto avatar-profile'
						style={{ border: `4px solid ${color}`, color: color }}
					>
						<Avatar />
					</Col>
					<Col
						xs={12}
						md={9}
						style={{ textAlign: 'center', fontWeight: '500' }}
					>
						<Row>
							<Col xs={12} className='mb-4 text-center '>
								<Card.Title
									className='mx-auto'
									style={{
										paddingBottom: '1em',
										boxShadow: ` 0 8px 6px -6px ${color}`,
										width: '50%',
									}}
								>
									{userData && (
										<h2
											style={{
												fontWeight: '700',
												fontSize: '2em',
												color: color,
											}}
										>
											Hello, {userData.username}
										</h2>
									)}
								</Card.Title>
							</Col>
							<Card.Body>
								<Row>
									{userData && (
										<Col
											xs={12}
											className='mt-4'
											style={{
												borderLeftColor: color,
												borderWidth: '2px',
											}}
										>
											<h3 style={{ display: 'inline-block', color: color }}>
												Profile created:{' '}
											</h3>
											<p
												style={{
													fontSize: '1.8em',
													display: 'inline-block',
													color: color,
												}}
											>
												{userData.createdAt &&
													format(new Date(userData.createdAt), 'MMMM dd, yyyy')}
											</p>
										</Col>
									)}
									{userRecipes && userRecipes.length !== 0 && (
										<Col
											xs={12}
											s={6}
											className='mt-4 recipes-created'
											style={{
												borderLeftColor: color,
												borderWidth: '2px',
												color: color,
											}}
										>
											<h3> Recipes created:</h3>
											<p style={{ fontSize: '2em', color: color }}>
												{userRecipes.length}
											</p>
										</Col>
									)}
								</Row>
							</Card.Body>
						</Row>
					</Col>
				</Row>
				{userRecipes && userRecipes.length !== 0 && (
					<>
						<Row className='mb-4 text-center '>
							<Card.Title
								className='mx-auto mt-5'
								style={{
									color: color,
									padding: '1em',
									boxShadow: ` 0 -8px 6px -6px ${color}`,
								}}
							>
								<h2
									style={{
										fontWeight: '700',
										fontSize: '2em',
									}}
								>
									Your recipes
								</h2>
							</Card.Title>
						</Row>
						<Row>
							{userRecipes.length !== 0 && (
								<RecipeList recipes={userRecipes} userData={user} />
							)}
						</Row>
					</>
				)}

				<Row
					className='justify-content-center align-items-center py-5 my-5'
					style={{ boxShadow: ` 0 -8px 6px -6px ${color}` }}
				>
					<Col xs={8}>
						<Button
							onClick={handleDelete}
							className='mx-auto delete'
							type='submit'
							style={{
								background: ' #dc3545',
								border: 'none',
								padding: '0.75em 1.5em',
								display: 'block',
								width: '100%',
							}}
						>
							Delete Profile
						</Button>
					</Col>
				</Row>
			</Container>
		)
	)
}
export default Profile
