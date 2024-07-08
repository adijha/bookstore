import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/Auth'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'

const CartItem = ({ name, price, quantity, onRemove, themeColor }) => (
	<div
		className={`flex justify-between items-center p-4 border-b ${
			themeColor === 'dark' ? 'border-gray-700' : 'border-gray-300'
		}`}
	>
		<div>
			<h3 className="text-lg font-semibold">{name}</h3>
			<p
				className={`${
					themeColor === 'dark' ? 'text-gray-300' : 'text-gray-600'
				}`}
			>
				Quantity: {quantity}
			</p>
		</div>
		<div className="flex items-center">
			<span className="text-lg font-bold">${price.toFixed(2)}</span>
			<button className="ml-4 text-red-500" onClick={onRemove}>
				<Trash2 size={18} />
			</button>
		</div>
	</div>
)

const CartPage = () => {
	const [cartItems, setCartItems] = useState([])
	const { isLoggedIn, getToken, themeColor } = useAuth()
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
					body: JSON.stringify({ cartItems }),
				}
			)

			if (response.ok) {
				setCartItems([])
				toast.success('Purchase successful! Books added to your collection.')
				navigate('/my-books')
			} else {
				const errorData = await response.json()
				console.error('Purchase failed:', errorData)
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
		<div
			className={`min-h-screen flex flex-col items-center ${
				themeColor === 'dark'
					? 'bg-gray-800 text-white'
					: 'bg-gray-100 text-black'
			}`}
		>
			<div
				className={`w-full max-w-3xl p-6 rounded-lg shadow-md mt-6 ${
					themeColor === 'dark' ? 'bg-gray-900' : 'bg-white'
				}`}
			>
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl font-bold">My Cart</h1>
					<ShoppingCart size={24} />
				</div>
				<p
					className={`${
						themeColor === 'dark' ? 'text-gray-300' : 'text-gray-600'
					} mb-4`}
				>
					Review your items and proceed to checkout when you're ready.
				</p>
				<div>
					{cartItems.map((item) => (
						<CartItem
							key={item._id}
							name={item.book.title}
							price={item.book.price}
							quantity={item.quantity}
							onRemove={() => removeFromCart(item._id)}
							themeColor={themeColor}
						/>
					))}
				</div>
				<div className="flex justify-between items-center mt-6 font-bold text-lg">
					<span>Total:</span>
					<span>${total.toFixed(2)}</span>
				</div>
				<button
					className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300"
					onClick={handlePurchase}
				>
					Purchase
				</button>
			</div>
		</div>
	)
}

export default CartPage
