import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Credentials.css'
import { toast } from 'react-toastify'
import { useAuth } from '../../store/Auth'

const URL = 'http://localhost:9000/api/v1/bookstore/login'

const Login = () => {
	const [userLogin, setUserLogin] = useState({
		email: '',
		password: '',
	})

	const navigate = useNavigate()

	const { storeTokenInLS } = useAuth()

	// --------------------------------------------------- handle Input --------------------------------------
	const handleInput = (e) => {
		let name = e.target.name
		let value = e.target.value

		// dynamically
		setUserLogin({
			...userLogin,
			[name]: value,
			// username: value
		})
	}

	// ? ---------------------------------- connecting fronted with backend and storing data in database -----------------------------

	// * handle submit
	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log(userLogin)

		try {
			const response = await fetch(URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userLogin),
			})

			const resp_data = await response.json()

			if (response.ok) {
				// Collecting userData, token and userId

				storeTokenInLS(resp_data.token)

				// clear the value form input after submitting
				setUserLogin({
					email: '',
					password: '',
				})

				// notification
				toast.success('Login Successfully', {
					autoClose: 1000, // auto close in 3sec
				})

				// navigate
				navigate('/')
			} else {
				// validation in alert box
				toast.error(
					resp_data.extraDetails ? resp_data.extraDetails : resp_data.message,
					{
						autoClose: 3000, // auto close in 3sec
					}
				)
			}

			console.log(response)
		} catch (error) {
			console.log('Login Error', error)
		}
	}

	// ? ---------------------------------------------------------- End : connecting fronted with backend ----------------------------------------

	return (
		<div className="credentialsSection login">
			<h2>Sign In</h2>
			<p>Please Login To Continue</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
				perferendis magnam soluta eum sequi officiis adipisci laboriosam,
				aliquid vel sed autem expedita molestias esse. Ullam explicabo
				recusandae voluptatibus! Voluptatem, ab.
			</p>

			{/* Login form */}
			<div className="loginForm">
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						name="email"
						placeholder="Email"
						required
						onChange={handleInput}
						value={userLogin.email}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						required
						onChange={handleInput}
						value={userLogin.password}
					/>
					<p>
						Not Registered? <Link to={'/register'}>Register Now</Link>
					</p>

					<div>
						<input type="submit" value="Login" className="btn" />
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
