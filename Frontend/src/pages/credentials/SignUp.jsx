import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserPlus } from 'lucide-react'
import { useAuth } from '../../store/Auth'

const URL = 'http://localhost:9000/api/v1/bookstore/register'

const SignUp = () => {
	const [userRegister, setUserRegister] = useState({
		name: '',
		email: '',
		password: '',
	})

	const navigate = useNavigate()
	const { themeColor } = useAuth()

	const handleInput = (e) => {
		const { name, value } = e.target
		setUserRegister((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log(userRegister)

		try {
			const response = await fetch(URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userRegister),
			})

			const resp_data = await response.json()

			if (response.ok) {
				setUserRegister({
					name: '',
					email: '',
					password: '',
				})

				toast.success('Sign Up Successful', {
					autoClose: 1000,
				})

				navigate('/login')
			} else {
				toast.error(
					resp_data.extraDetails ? resp_data.extraDetails : resp_data.message,
					{
						autoClose: 3000,
					}
				)
			}

			console.log(response)
		} catch (error) {
			console.log('Register Error: ', error)
		}
	}

	return (
		<div
			className={`min-h-screen flex items-center justify-center px-4 ${
				themeColor === 'dark' ? 'bg-gray-800' : 'bg-secondary'
			}`}
		>
			<div
				className={`rounded-lg shadow-md p-8 max-w-xl w-full ${
					themeColor === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'
				}`}
			>
				<div className="flex justify-between items-center mb-6">
					<h2
						className={`text-3xl font-bold ${
							themeColor === 'dark' ? 'text-white' : 'text-gray-800'
						}`}
					>
						Sign Up
					</h2>
					<UserPlus size={32} className="text-primary" />
				</div>
				<p
					className={`mb-8 ${
						themeColor === 'dark' ? 'text-gray-300' : 'text-gray-600'
					}`}
				>
					Please sign up to continue
				</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="name"
							className={`block text-sm font-medium mb-1 ${
								themeColor === 'dark' ? 'text-gray-300' : 'text-gray-700'
							}`}
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Enter your name"
							required
							onChange={handleInput}
							value={userRegister.name}
							className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
								themeColor === 'dark'
									? 'bg-gray-800 border-gray-700 text-gray-300'
									: 'border-gray-300'
							}`}
						/>
					</div>
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
							value={userRegister.email}
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
							value={userRegister.password}
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
						Already Registered?{' '}
						<Link to="/login" className="text-primary hover:underline">
							Login Now
						</Link>
					</p>
					<div>
						<button
							type="submit"
							className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
						>
							<UserPlus size={18} className="mr-2" />
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignUp
