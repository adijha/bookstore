import { useEffect, useState } from 'react'
import './cart.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/Auth'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'

const CartItem = ({ name, price, quantity, onRemove }) => (
	<div className="cart-item">
		<div className="cart-item-details">
			<h3>{name}</h3>
			<p>Quantity: {quantity}</p>
		</div>
		<div className="cart-item-actions">
			<span className="cart-item-price">${price.toFixed(2)}</span>
			<button className="remove-item" onClick={onRemove}>
				<Trash2 size={18} />
			</button>
		</div>
	</div>
)

const CartPage = () => {
	const [cartItems, setCartItems] = useState([])
	const { isLoggedIn, getToken } = useAuth()
	const navigate = useNavigate()

	if (!isLoggedIn) {
		return <Navigate to="/login" />
	}

	const fetchCartItems = async () => {
		try {
			const response = await fetch(
				'http://localhost:9000/api/v1/bookstore/cart',
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				}
			)

			if (response.ok) {
				const data = await response.json()
				setCartItems(data)
			} else {
				toast.error('Failed to fetch cart items')
			}
		} catch (error) {
			console.error('Error fetching cart items:', error)
			toast.error('An error occurred while fetching cart items')
		}
	}

	useEffect(() => {
		fetchCartItems()
	}, [])

	const removeFromCart = async (itemId) => {
		try {
			const response = await fetch(
				`http://localhost:9000/api/v1/bookstore/cart/remove/${itemId}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				}
			)

			if (response.ok) {
				setCartItems(cartItems.filter((item) => item._id !== itemId))
				toast.success('Item removed from cart')
			} else {
				toast.error('Failed to remove item from cart')
			}
		} catch (error) {
			console.error('Error removing item from cart:', error)
			toast.error('An error occurred while removing the item')
		}
	}

	const handlePurchase = async () => {
		try {
			const response = await fetch(
				'http://localhost:9000/api/v1/bookstore/purchase',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${getToken()}`,
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.ok) {
				const data = await response.json()
				console.log('Purchase response:', data) // Log the response
				setCartItems([])
				toast.success('Purchase successful! Books added to your collection.')
				navigate('/my-books')
			} else {
				const errorData = await response.json()
				console.error('Purchase failed:', errorData) // Log the error
				toast.error('Failed to complete the purchase: ' + errorData.message)
			}
		} catch (error) {
			console.error('Error during purchase:', error)
			toast.error('An error occurred during the purchase')
		}
	}

	const total = cartItems.reduce(
		(sum, item) => sum + Number(item.book.price) * Number(item.quantity),
		0
	)

	return (
		<div className="cart-container">
			<div className="cart-header">
				<h1>My Cart</h1>
				<ShoppingCart size={24} />
			</div>
			<p className="cart-description">
				Review your items and proceed to checkout when you're ready.
			</p>
			<div className="cart-items">
				{cartItems.map((item) => (
					<CartItem
						key={item._id}
						name={item.book.title}
						price={item.book.price}
						quantity={item.quantity}
						onRemove={() => removeFromCart(item._id)}
					/>
				))}
			</div>
			<div className="cart-total">
				<span>Total:</span>
				<span>${total.toFixed(2)}</span>
			</div>
			<button className="checkout-button" onClick={handlePurchase}>
				Purchase
			</button>
		</div>
	)
}

export default CartPage
