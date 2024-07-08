import { useState, useEffect } from 'react'
import { useAuth } from '../../store/Auth'
import { toast } from 'react-toastify'
import { Book } from 'lucide-react'
import { Navigate } from 'react-router-dom'

const BookItem = ({ title, author, imageUrl, themeColor }) => (
	<div
		className={`p-4 border rounded-lg ${
			themeColor === 'dark'
				? 'border-gray-700 bg-gray-800'
				: 'border-gray-300 bg-white'
		}`}
	>
		<img
			src={imageUrl || 'https://via.placeholder.com/150'}
			alt={title}
			className="w-full h-48 object-cover rounded-md mb-4"
		/>
		<div className="text-center">
			<h3 className="text-lg font-semibold">{title}</h3>
			<p
				className={`${
					themeColor === 'dark' ? 'text-gray-300' : 'text-gray-600'
				}`}
			>
				{author}
			</p>
		</div>
	</div>
)

const MyBooks = () => {
	const [myBooks, setMyBooks] = useState([])
	const { getToken, isLoggedIn, themeColor } = useAuth()

	useEffect(() => {
		if (isLoggedIn) {
			fetchMyBooks()
		}
	}, [isLoggedIn])

	const fetchMyBooks = async () => {
		try {
			const response = await fetch(
				'http://localhost:9000/api/v1/bookstore/my-books',
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				}
			)

			if (response.ok) {
				const data = await response.json()
				setMyBooks(data)
			} else {
				toast.error('Failed to fetch your books')
			}
		} catch (error) {
			console.error('Error fetching my books:', error)
			toast.error('An error occurred while fetching your books')
		}
	}

	if (!isLoggedIn) {
		toast.error('Please log in to view your books')
		return <Navigate to="/login" />
	}

	return (
		<div
			className={`min-h-screen p-6 ${
				themeColor === 'dark'
					? 'bg-gray-800 text-white'
					: 'bg-gray-100 text-black'
			}`}
		>
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold">My Books</h1>
					<Book size={32} />
				</div>
				<p className="mb-6">
					Here are all the books you've purchased. Enjoy your reading!
				</p>
				{myBooks.length === 0 ? (
					<p>You haven't purchased any books yet.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{myBooks.map((book) => (
							<BookItem
								key={book._id}
								title={book.title}
								author={book.author}
								imageUrl={book.imageUrl}
								themeColor={themeColor}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default MyBooks
