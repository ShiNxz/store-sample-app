import '../styles/globals.scss'
import Head from 'next/head'
import { NextUIProvider } from '@nextui-org/react'
import { AppContextProvider } from '@/data/AppContext'
import { CartContextProvider } from '@/data/CartContext'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import Collapse from '@mui/material/Collapse'
import { lightTheme } from './../theme'

const theme = createTheme({
	typography: {
		fontFamily: 'Rubik',
	},
})

const App = (props) => {
	const { Component, pageProps } = props

	return (
		<>
			<Head>
				<title>Store Sample</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>

			<NextUIProvider theme={lightTheme}>
				<ThemeProvider theme={theme}>
					<AppContextProvider>
						<CartContextProvider>
							<SnackbarProvider
								maxSnack={3}
								anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
								TransitionComponent={Collapse}
							>
								<Component {...pageProps} />
							</SnackbarProvider>
						</CartContextProvider>
					</AppContextProvider>
				</ThemeProvider>
			</NextUIProvider>
		</>
	)
}

export default App
