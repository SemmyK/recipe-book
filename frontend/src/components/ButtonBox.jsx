import { useNavigate } from 'react-router-dom'
//bootstrap components
import { Button, Row, Col } from 'react-bootstrap'
//assets
import trash from '../assets/trash3.svg'
import edit from '../assets/edit.svg'
//components
import { toast } from 'react-toastify'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { deleteRecipe } from '../features/recipe/recipeSlice'

function ButtonBox({ color, text, recipe, width }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { userData } = useSelector(state => state.auth)

	const handleClick = async e => {
		if (e.target.innerText === 'Cook this') {
			navigate(`/recipes/${recipe._id}`)
		} else {
			navigate('/')
		}
	}

	const handleDelete = () => {
		//dispatch action to get single recipe
		dispatch(deleteRecipe(recipe._id))
			.unwrap()
			.then(() => {
				toast.info('Successfully deleted recipe.')
				navigate('/')
			})
			.catch(toast.error)
	}

	return (
		<div className='btn-div' style={{ width: `${width ? width : '100%'}` }}>
			<Row>
				<Row>
					<Col xs={10}>
						<Button
							variant='btn-outline-success'
							style={{ background: color, display: 'block' }}
							onClick={handleClick}
						>
							{text}
						</Button>
					</Col>
				</Row>

				{userData && recipe.user.toString() === userData._id.toString() && (
					<Col xs={5}>
						<Button
							variant='btn-outline-success'
							style={{ background: color }}
							className='trash'
							onClick={handleDelete}
						>
							<img src={trash} alt='delete icon' />
						</Button>
					</Col>
				)}
				{userData && recipe.user.toString() === userData._id.toString() && (
					<Col xs={5}>
						<Button
							variant='btn-outline-success'
							style={{ background: color }}
							className='trash'
							onClick={() => {
								navigate(`/update-recipe/${recipe._id}`)
							}}
						>
							<img src={edit} alt='delete icon' />
						</Button>
					</Col>
				)}
			</Row>
		</div>
	)
}
export default ButtonBox
