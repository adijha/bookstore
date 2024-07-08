import { Link } from 'react-router-dom'
import { useAuth } from '../store/Auth'

const Navbar = () => {
	const { theme, themeColor, isLoggedIn } = useAuth()

	const handleTheme = () => {
		theme()
	}

	return (
		<nav className="bg-primary p-4 ">
			<div className="container mx-auto flex justify-between items-center w-7xl">
				<div>
					<h1 className="text-white text-2xl font-bold">
						<Link to={'/'} className="text-white hover:text-gray-200">
							Book Store
						</Link>
					</h1>
				</div>
				<ul className="flex space-x-6">
					<li className="flex items-center">
						<Link to={'/about'} className="text-white hover:text-gray-200">
							About
						</Link>
					</li>
					<li className="flex items-center">
						<Link to={'/my-books'} className="text-white hover:text-gray-200">
							My books
						</Link>
					</li>
					<li className="flex items-center">
						<Link to={'/cart'} className="text-white hover:text-gray-200">
							Cart
						</Link>
					</li>
					<li>
						{isLoggedIn ? (
							<Link to={'/logout'}>
								<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
									Logout
								</button>
							</Link>
						) : (
							<Link to={'/login'}>
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
									Login
								</button>
							</Link>
						)}
					</li>
					<li>
						<button
							onClick={handleTheme}
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
						>
							{themeColor === 'light' ? 'Dark' : 'Light'}
						</button>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
