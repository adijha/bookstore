import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem('tokenBookStore'))
	const [themeColor, setThemeColor] = useState('light')

	const theme = () => {
		setThemeColor(themeColor === 'light' ? 'dark' : 'light')
	}

	const storeTokenInLS = (serverToken) => {
		setToken(serverToken)
		localStorage.setItem('tokenBookStore', serverToken)
	}

	const logoutUser = () => {
		setToken('')
		localStorage.removeItem('tokenBookStore')
	}

	const getToken = () => {
		return token
	}

	let isLoggedIn = !!token

	return (
		<AuthContext.Provider
			value={{
				theme,
				themeColor,
				logoutUser,
				isLoggedIn,
				storeTokenInLS,
				getToken, // Add this new function
				token, // Include the token in the context value
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const authContextValue = useContext(AuthContext)
	if (!authContextValue) {
		throw new Error('useAuth used outside of the Provider')
	}
	return authContextValue
}
