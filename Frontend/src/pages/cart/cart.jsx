import { useEffect, useState } from 'react'
import './cart.css'
import image from '../../assets/bookImage.jpg'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../store/Auth'

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

	return (
		<div className="homeCardSection">
			<h1>My cart</h1>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
				perspiciatis alias eaque tenetur debitis inventore facilis cupiditate
				amet dolore dolor!
			</p>
			<div className="cardBox grid gridFourTemplate">
				{course.map((item, index) => {
					return (
						<div key={index} className="card">
							<div>
								<img src={image} alt="Department" />
							</div>
							<div>
								<span>{item.name}</span>
								<span>{item.category}</span>
							</div>
							<div>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Nesciunt, adipisci!
								</p>
							</div>
							<div>
								<span>$ {item.price}</span>
								<button>Buy now</button>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Coures
