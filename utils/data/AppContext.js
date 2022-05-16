import { createContext, useState, useEffect, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false)
	const LoadingRef = useRef(null)

	// Loader Methods
	const loader = {
		start: () => LoadingRef.current.continuousStart(),
		complete: () => LoadingRef.current.complete()
	}

	return (
		<AppContext.Provider value={{ loading, setLoading, loader }}>
			<LoadingBar
				color='#0099ff'
				containerStyle={{ direction: 'ltr' }}
				ref={LoadingRef}
			/>
			{children}
		</AppContext.Provider>
	)
}

export default AppContext
