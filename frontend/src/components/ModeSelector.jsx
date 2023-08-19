import { useTheme } from '../hooks/useTheme'
//assets
import modeIcon from '../assets/mode-icon.svg'

export default function ModeSelector() {
	const { changeMode, mode } = useTheme()

	const toggleMode = () => {
		changeMode(mode === 'dark' ? 'light' : 'dark')
	}
	return (
		<div className='theme-selector mx-3'>
			<div className='mode-toggle'>
				<img
					alt='dark/light toggle icon'
					src={modeIcon}
					onClick={toggleMode}
					style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
				/>
			</div>
		</div>
	)
}
