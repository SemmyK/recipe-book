import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
//hooks
import { useTheme } from '../hooks/useTheme'
//bootstrap components
import Card from 'react-bootstrap/Card'
//components
import ButtonBox from '../components/ButtonBox'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { toast } from 'react-toastify'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { getRecipe } from '../features/recipe/recipeSlice'

function SingleRecipe() {
	const { color, mode } = useTheme()
	const { id } = useParams()
	const dispatch = useDispatch()
	const { recipe, isLoading } = useSelector(state => state.recipe)

	useEffect(() => {
		dispatch(getRecipe(id)).unwrap().catch(toast.error)
	}, [id, dispatch])

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
		<article
			className='recipe d-flex justify-content-around'
			style={{ width: '100%' }}
		>
			{recipe && (
				<Card style={{ textAlign: 'center', width: '80%' }}>
					<Card.Body>
						<Card.Title
							style={{ color: color, boxShadow: ` 0 8px 6px -6px ${color}` }}
						>
							{recipe.title}
						</Card.Title>
						<p className='blockquote-footer' style={{ fontSize: '1.20em' }}>
							{recipe.cookingTime} to make
						</p>
						<Card.Subtitle className='mb-2 text-muted mx-auto w-50vw'>
							<ul
								style={{
									display: 'inline-block',
									textAlign: 'left',
									fontSize: '1.25em',
								}}
							>
								{recipe &&
									recipe.ingredients.length !== 0 &&
									recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
							</ul>
						</Card.Subtitle>
						<div className='card-text'>
							<ol style={{ textAlign: 'left' }}>
								{recipe.length !== 0 &&
									recipe.method
										.split('.')
										.map((step, index) => <li key={index}>{step}</li>)}
							</ol>
						</div>

						<ButtonBox
							width='70%'
							btn='6'
							del='2'
							text='Go back'
							color={color}
							recipe={recipe}
						/>
					</Card.Body>
				</Card>
			)}
		</article>
	)
}
export default SingleRecipe
