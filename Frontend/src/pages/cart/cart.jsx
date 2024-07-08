import { useEffect, useState } from 'react'
import './cart.css'
import image from '../../assets/bookImage.jpg'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../store/Auth'
import { ShoppingCart, Trash2 } from 'lucide-react'


const CartItem = ({ name, price, quantity }) => (
  <div className="cart-item">
    <div className="cart-item-details">
      <h3>{name}</h3>
      <p>Quantity: {quantity}</p>
    </div>
    <div className="cart-item-actions">
      <span className="cart-item-price">${price.toFixed(2)}</span>
      <button className="remove-item"><Trash2 size={18} /></button>
    </div>
  </div>
);
const Coures = () => {
	const [course, setCourse] = useState([])

	const { isLoggedIn } = useAuth()

	if (!isLoggedIn) {
		return <Navigate to="/login" />
	}

	const useService = async () => {
		try {
			const response = await fetch(
				'http://localhost:9000/api/v1/bookstore/course',
				{
					method: 'GET',
				}
			)

			if (response.ok) {
				const courseData = await response.json()

				setCourse(courseData)
			}
		} catch (error) {
			console.log('course page :  ', error)
		}
	}

	// automatically run this function
	useEffect(() => {
		useService()
	}, [])

	const cartItems = [
		{ name: 'Book 1', price: 19.99, quantity: 1 },
		{ name: 'Book 2', price: 29.99, quantity: 2 },
		{ name: 'Book 3', price: 14.99, quantity: 1 },
	]

	const total = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
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
        {cartItems.map((item, index) => (
          <CartItem key={index} {...item} />
        ))}
      </div>
      <div className="cart-total">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="checkout-button">Proceed to Checkout</button>
    </div>
  );
}

export default Coures
