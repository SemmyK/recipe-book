import { useSelector } from 'react-redux'

function Avatar() {
	const { user } = useSelector(state => state.auth)

	return (
		<div className='avatar'>{user && <p>{user.email[0].toUpperCase()}</p>}</div>
	)
}
export default Avatar
