import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//bootstrap components
import { Button } from 'react-bootstrap'
//components
import { toast } from 'react-toastify'
import { searchRecipes } from '../features/recipe/recipeSlice'
//redux
import { useDispatch } from 'react-redux'

function Search() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [searchTerm, setSearchTerm] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (searchTerm !== '') {
			if (searchTerm !== '') {
				// dispatch action to get single recipe
				dispatch(searchRecipes(searchTerm))
					.unwrap()
					.then(searchedRecipes => {
						setTimeout(() => {
							console.log(searchedRecipes)
							if (searchedRecipes.length === 0) {
								setTimeout(() => navigate('/'), 3000)
							}
						}, 2000)
					})
					.catch(toast.error)
			}
		}
		navigate(`/search?q=${searchTerm}`)
		setSearchTerm('')
	}

	return (
		<form className='d-flex searchComponent mx-3' onSubmit={handleSubmit}>
			<input
				type='text'
				required
				value={searchTerm}
				placeholder='Search'
				className='me-2'
				aria-label='Search'
				onChange={e => setSearchTerm(e.target.value.trim())}
			/>

			<Button
				variant='outline-success'
				type='submit'
				style={{ marginTop: '0px', height: '100%' }}
			>
				Search
			</Button>
		</form>
	)
}
export default Search
