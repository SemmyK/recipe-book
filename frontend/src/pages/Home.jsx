import { useEffect } from 'react'
//hooks
import { useTheme } from '../hooks/useTheme'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from '../features/recipe/recipeSlice'
//components
import { ScaleLoader } from 'react-spinners'
import RecipeList from '../components/RecipeList'

function Home() {
	const dispatch = useDispatch()
	const { color, changeColor, mode } = useTheme()
	const { recipes, isLoading } = useSelector(state => state.recipe)
	const { user } = useSelector(state => state.auth)
	useEffect(() => {
		dispatch(getAllRecipes())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (user) {
			changeColor(user.theme)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (isLoading) {
		return (
			<div className='d-flex justify-content-center align-items-center  h-100'>
				<ScaleLoader
					color={mode === 'dark' ? '#fff' : color}
					width='10px'
					height='100px'
				/>
			</div>
		)
	}

	return (
		<div className='home'>{recipes && <RecipeList recipes={recipes} />}</div>
	)
}
export default Home
