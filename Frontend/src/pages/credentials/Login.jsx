import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../store/Auth'
import { LogIn } from 'lucide-react'

const URL = 'http://localhost:9000/api/v1/bookstore/login'

const Login = () => {
	const [userLogin, setUserLogin] = useState({
		email: '',
		password: '',
	})

	const navigate = useNavigate()
	const { storeTokenInLS, themeColor } = useAuth()

	const handleInput = (e) => {
		const { name, value } = e.target
		setUserLogin((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userLogin),
			})

			const data = await response.json()

			if (response.ok) {
				storeTokenInLS(data.token)

				setUserLogin({
					email: '',
					password: '',
				})

				toast.success('Login Successful', {
					autoClose: 1000,
				})

				navigate('/')
			} else {
				toast.error(data.message || 'Login failed', {
					autoClose: 3000,
				})
			}
		} catch (error) {
			console.error('Login Error:', error)
			toast.error('An error occurred. Please try again.', {
				autoClose: 3000,
			})
		}
	}

	return (
		<div
			className={`min-h-screen flex items-center justify-center p-4 ${
				themeColor === 'dark' ? 'bg-gray-800' : 'bg-secondary'
			}`}
		>
			<div
				className={`rounded-lg shadow-md p-8 max-w-lg w-full ${
					themeColor === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'
				}`}
			>
				<div className="flex justify-between items-center mb-6">
					<h2
						className={`text-3xl font-bold ${
							themeColor === 'dark' ? 'text-white' : 'text-gray-800'
						}`}
					>
						Sign In
					</h2>
					<LogIn size={32} className="text-primary" />
				</div>
				<p
					className={`mb-8 ${
						themeColor === 'dark' ? 'text-gray-300' : 'text-gray-600'
					}`}
				>
					Please login to continue
				</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className={`block text-sm font-medium mb-1 ${
								themeColor === 'dark' ? 'text-gray-300' : 'text-gray-700'
							}`}
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Enter your email"
							required
							onChange={handleInput}
							value={userLogin.email}
							className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
								themeColor === 'dark'
									? 'bg-gray-800 border-gray-700 text-gray-300'
									: 'border-gray-300'
							}`}
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className={`block text-sm font-medium mb-1 ${
								themeColor === 'dark' ? 'text-gray-300' : 'text-gray-700'
							}`}
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter your password"
							required
							onChange={handleInput}
							value={userLogin.password}
							className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
								themeColor === 'dark'
									? 'bg-gray-800 border-gray-700 text-gray-300'
									: 'border-gray-300'
							}`}
						/>
					</div>
					<p
						className={`text-sm ${
							themeColor === 'dark' ? 'text-gray-300' : 'text-gray-600'
						}`}
					>
						Not Registered?{' '}
						<Link to="/register" className="text-primary hover:underline">
							Register Now
						</Link>
					</p>
					<div>
						<button
							type="submit"
							className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
						>
							<LogIn size={18} className="mr-2" />
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
