import { Col, Row } from 'react-bootstrap'
import { useTheme } from '../hooks/useTheme'

const filterList = [
	'all',
	'meal',
	'soup',
	'salad',
	'smoothie',
	'snack',
	'sauce',
	'side',
	'dessert',
]

export default function ProjectFilter({ changeFilter, currentFilter }) {
	const { color } = useTheme()
	const handleClick = newFilter => {
		changeFilter(newFilter)
	}
	return (
		<div className='project-filter'>
			<Row className='justify-content-center align-items-center filter-row'>
				<Col xs={12} sm={3} md={2} className='mx-auto text-center'>
					<p>Filter by: </p>
				</Col>
				<Col xs={12} sm={9} md={10}>
					<Row>
						{filterList.map(f => (
							<Col key={f} className='filter-col'>
								<button
									onClick={() => handleClick(f)}
									className={currentFilter === f ? 'active' : ''}
									style={{ color: color }}
								>
									{f}
								</button>
							</Col>
						))}
					</Row>
				</Col>
			</Row>
		</div>
	)
}
