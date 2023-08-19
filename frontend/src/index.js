import React from 'react'
import { createRoot } from 'react-dom/client'

//redux
import { Provider } from 'react-redux'
//context
import { store } from './app/store'
import { ThemeProvider } from './context/ThemeContext'
//components
import App from './App'
//style
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
)
