import { useLocation } from 'react-router-dom'
//hooks
import { useTheme } from '../hooks/useTheme'
//bootstrap
import { Container } from 'react-bootstrap'
//components
import RecipeList from '../components/RecipeList'
import { ScaleLoader } from 'react-spinners'
//redux
import { useSelector } from 'react-redux'
 
function SearchResults() {
	const { color, mode } = useTheme()
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const searchTerm = queryParams.get('q')
	const { searchedRecipes, isLoading: loading } = useSelector(
		state => state.recipe
	)

	if (loading) {
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
		<Container className='home search'>
			{searchedRecipes && (
				<>
					{!searchedRecipes || searchedRecipes.length === 0 ? (
						<p
							className='text-center search-title'
							style={{ color: color, boxShadow: ` 0 8px 6px -6px ${color}` }}
						>
							No recipes including word "{searchTerm}"
						</p>
					) : (
						<>
							<p
								className='text-center search-title'
								style={{ color: color, boxShadow: ` 0 8px 6px -6px ${color}` }}
							>
								Recipes including word "{searchTerm}"
							</p>
							{searchedRecipes.length !== 0 ? (
								<RecipeList recipes={searchedRecipes} />
							) : (
								<h2>No recipes to show</h2>
							)}
						</>
					)}
				</>
			)}
		</Container>
	)
}
export default SearchResults
