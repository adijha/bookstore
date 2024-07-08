const Book = require('../model/bookSchema')
const Cart = require('../model/cartSchema') // Assuming you have a Cart model
const User = require('../model/userSchema')

// Get all books for homepage
const getAllBooks = async (req, res) => {
	console.log('req')
	try {
		const books = await Book.find().select(
			'title author price imageUrl description'
		)
		if (!books || books.length === 0) {
			return res.status(404).json({ message: 'No books found' })
		}
		res.status(200).json(books)
	} catch (error) {
		console.log('Error fetching books:', error)
		res.status(500).json({ message: 'Server error', error: error.message })
	}
}

// Add product to cart
const addToCart = async (req, res) => {
	try {
		const { bookId, quantity } = req.body
		if (!req.user || !req.user.id) {
			return res.status(401).json({ message: 'User not authenticated' })
		}
		const userId = req.user.id

		let cart = await Cart.findOne({ user: userId })

		if (!cart) {
			cart = new Cart({ user: userId, items: [] })
		}

		const bookIndex = cart.items.findIndex(
			(item) => item.book.toString() === bookId
		)

		if (bookIndex > -1) {
			// Book exists in cart, update quantity
			cart.items[bookIndex].quantity += quantity
		} else {
			// Book doesn't exist in cart, add new item
			cart.items.push({ book: bookId, quantity })
		}

		await cart.save()
		res.status(200).json({ message: 'Book added to cart successfully', cart })
	} catch (error) {
		console.log('Error adding to cart:', error)
		res
			.status(400)
			.json({ message: 'Error adding to cart', error: error.message })
	}
}

const getCartItems = async (req, res) => {
	try {
		const userId = req.user.id
		const cart = await Cart.findOne({ user: userId }).populate('items.book')
		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' })
		}
		res.status(200).json(cart.items)
	} catch (error) {
		console.error('Error fetching cart items:', error)
		res.status(500).json({ message: 'Error fetching cart items' })
	}
}

const removeFromCart = async (req, res) => {
	try {
		const userId = req.user.id
		const itemId = req.params.itemId

		const cart = await Cart.findOne({ user: userId })
		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' })
		}

		cart.items = cart.items.filter((item) => item._id.toString() !== itemId)
		await cart.save()

		res.status(200).json({ message: 'Item removed from cart' })
	} catch (error) {
		console.error('Error removing item from cart:', error)
		res.status(500).json({ message: 'Error removing item from cart' })
	}
}

const purchase = async (req, res) => {
	try {
		const userId = req.user.id
		const cart = await Cart.findOne({ user: userId }).populate('items.book')

		if (!cart || cart.items.length === 0) {
			return res.status(400).json({ message: 'Cart is empty' })
		}

		// Add books to user's collection
		const user = await User.findById(userId)
		for (let item of cart.items) {
			if (!user.myBooks.includes(item.book._id)) {
				user.myBooks.push(item.book._id)
			}
		}
		await user.save()

		// Clear the cart
		cart.items = []
		await cart.save()

		res
			.status(200)
			.json({ message: 'Purchase successful', purchasedBooks: user.myBooks })
	} catch (error) {
		console.error('Error during purchase:', error)
		res.status(500).json({ message: 'Error processing purchase' })
	}
}

module.exports = {
	getAllBooks,
	addToCart,
	getCartItems,
	removeFromCart,
	purchase,
}
