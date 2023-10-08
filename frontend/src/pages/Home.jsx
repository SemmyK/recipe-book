import { useEffect, useState } from 'react'
//hooks
import { useTheme } from '../hooks/useTheme'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from '../features/recipe/recipeSlice'
//components
import { ScaleLoader } from 'react-spinners'
import RecipeList from '../components/RecipeList'
import ProjectFilter from '../components/ProjectFilter'
import { Col, Row } from 'react-bootstrap'

function Home() {
	const dispatch = useDispatch()
	const { color, changeColor, mode } = useTheme()
	const { recipes, isLoading } = useSelector(state => state.recipe)
	const { user } = useSelector(state => state.auth)
	const [filter, setFilter] = useState('all')
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

	const changeFilter = newFilter => {
		setFilter(newFilter)
	}

	const filteredRecipes = recipes
		? recipes.filter(document => {
				switch (filter) {
					case 'all':
						return true
					case 'meal':
					case 'snack':
					case 'salad':
					case 'side':
					case 'smoothie':
					case 'soup':
					case 'sauce':
					case 'dessert':
						return document.type === filter
					default:
						return true
				}
		  })
		: null

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
		<div className='home'>
			<Row className='justify-content-center align-items-center'>
				<Col xs={10}>
					<ProjectFilter changeFilter={changeFilter} currentFilter={filter} />
				</Col>
				<Col xs={12}>{recipes && <RecipeList recipes={filteredRecipes} />}</Col>
			</Row>
		</div>
	)
}
export default Home
