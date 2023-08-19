import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//toastify style
import 'react-toastify/dist/ReactToastify.css'
//pages
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import SignIn from './pages/SingIn'
import Profile from './pages/Profile'
import SingleRecipe from './pages/SingleRecipe'
import Create from './pages/Create'
import RecipeDetails from './pages/RecipeDetails'
import SearchResults from './pages/SearchResults'
//components
import PrivateRoute from './components/PrivateRoute'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import ModeSelector from './components/ModeSelector'
import NavMenu from './components/NavMenu'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from './features/auth/authSlice'
import { getUserRecipes } from './features/recipe/recipeSlice'
//hooks
import { useTheme } from './hooks/useTheme'

function App() {
	const dispatch = useDispatch()
	const { user } = useSelector(state => state.auth)
	const { mode } = useTheme()

	useEffect(() => {
		if (user) {
			dispatch(getProfile(user._id))
			dispatch(getUserRecipes(user._id))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<BrowserRouter>
				<div className={`App ${mode}`}>
					<header>
						<NavMenu />
						<ModeSelector />
					</header>
					<main>
						<Routes>
							{/* public routes */}
							<Route path='/' element={<Home />} />
							<Route path='/recipes/:id' element={<SingleRecipe />} />
							<Route path='/search' element={<SearchResults />} />

							{/* protected routes */}
							<Route path='/register' element={<ProtectedRoute />}>
								<Route path='/register' element={<SignUp />} />
							</Route>

							<Route path='/login' element={<ProtectedRoute />}>
								<Route path='/login' element={<SignIn />} />
							</Route>

							{/* private routes */}
							<Route path='/profile/:id' element={<PrivateRoute />}>
								<Route path='/profile/:id' element={<Profile />} />
							</Route>
							<Route path='/create' element={<PrivateRoute />}>
								<Route path='/create' element={<Create />} />
							</Route>
							<Route path='/update-recipe/:id' element={<PrivateRoute />}>
								<Route path='/update-recipe/:id' element={<RecipeDetails />} />
							</Route>
						</Routes>
						<ToastContainer />
					</main>
				</div>
			</BrowserRouter>
		</>
	)
}

export default App
