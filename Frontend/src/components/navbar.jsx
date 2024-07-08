import { Link } from 'react-router-dom'
import './navbar.css'

import { useAuth } from '../store/Auth'

const Navbar = () => {
	const { theme, themeColor, isLoggedIn } = useAuth()

	const handleTheme = () => {
		theme()
	}

	return (
		<div className="navbar container">
			<div>
				<h1>bookStore</h1>
			</div>
			<ul>
				<li>
					<Link to={'/'}>Home</Link>
				</li>
				<li>
					<Link to={'/about'}>About</Link>
				</li>
				<li>
					<Link to={'/my-books'}>My books</Link>
				</li>
				<li>
					<Link to={'/cart'}>Cart</Link>
				</li>
				<li>
					{isLoggedIn ? (
						<Link to={'/logout'}>
							<button className="btn">Logout</button>
						</Link>
					) : (
						<Link to={'/login'}>
							<button className="btn">Login</button>
						</Link>
					)}
				</li>
				<li className="theme">
					<button onClick={handleTheme}>
						{themeColor === 'light' ? 'Dark' : 'Light'}
					</button>
				</li>
			</ul>
		</div>
	)
}

export default Navbar
