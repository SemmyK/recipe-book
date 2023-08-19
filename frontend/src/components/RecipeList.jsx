import { useEffect } from 'react'
//bootstrap components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//components
import RecipeCard from './RecipeCard'
import { toast } from 'react-toastify'

export default function RecipeList({ recipes }) {
	useEffect(() => {
		if (recipes.length === 0) {
			toast.info('No recipes to show')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<article className='mx-auto' style={{ padding: '1em ', width: '95%' }}>
			<Row className='mx-auto w-100'>
				{recipes &&
					recipes !== [] &&
					recipes.map(recipe => (
						<Col
							key={recipe._id}
							xs={12}
							md={6}
							lg={4}
							style={{ padding: '1em 0' }}
						>
							<RecipeCard recipe={recipe} />
						</Col>
					))}
			</Row>
		</article>
	)
}
