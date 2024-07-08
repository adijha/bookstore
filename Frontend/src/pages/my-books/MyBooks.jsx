import { useState, useEffect } from 'react'
import { useAuth } from '../../store/Auth'
import { toast } from 'react-toastify'
import { Book } from 'lucide-react'
import './myBooks.css' // You'll need to create this CSS file

const BookItem = ({ title, author, imageUrl }) => (
	<div className="book-item">
		<img
			src={imageUrl || 'https://via.placeholder.com/150'}
			alt={title}
			className="book-cover"
		/>
		<div className="book-details">
			<h3>{title}</h3>
			<p>{author}</p>
		</div>
	</div>
)

const MyBooks = () => {
	const [myBooks, setMyBooks] = useState([])
	const { getToken, isLoggedIn } = useAuth()

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
		return <div>Please log in to view your books.</div>
	}

	return (
		<div className="my-books-container">
			<div className="my-books-header">
				<h1>My Books</h1>
				<Book size={24} />
			</div>
			<p className="my-books-description">
				Here are all the books you've purchased. Enjoy your reading!
			</p>
			{myBooks.length === 0 ? (
				<p>You haven't purchased any books yet.</p>
			) : (
				<div className="books-grid">
					{myBooks.map((book) => (
						<BookItem
							key={book._id}
							title={book.title}
							author={book.author}
							imageUrl={book.imageUrl}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default MyBooks
