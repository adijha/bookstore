const Book = require('../model/bookSchema')
const Cart = require('../model/cartSchema') // Assuming you have a Cart model

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
    const { bookId, quantity } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const userId = req.user.id;

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

// Get all cart products
const getCartProducts = async (req, res) => {
	try {
		const userId = req.user.id // Assuming you have authentication middleware that sets req.user
		const cart = await Cart.findOne({ user: userId }).populate('items.book')

		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' })
		}

		res.status(200).json(cart.items)
	} catch (error) {
		console.log('Error fetching cart:', error)
		res
			.status(500)
			.json({ message: 'Error fetching cart', error: error.message })
	}
}

module.exports = { getAllBooks, addToCart, getCartProducts }
