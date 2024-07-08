import React, { useEffect, useState } from 'react'
import './HomeCard.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import image from '../../assets/bookImage.jpg'

const HomeCard = () => {
	const [course, setCourse] = useState([])

	// TODO: ------------------------------------------Filter method: is used to show only free book--------------------------

	const freeCourse = course.filter((data) => data.category === 'Free')

	// console.log(freeCourse);

	// TODO:End ------------------------------------------filter method--------------------------------------------------------

	// fetch course data from backend

	const useService = async () => {
		try {
			const response = await fetch(
				'http://localhost:9000/api/v1/bookstore/course',
				{
					method: 'GET',
				}
			)

			if (response.ok) {
				const serviceData = await response.json()

				console.log(serviceData)

				setCourse(serviceData)
			}
		} catch (error) {
			console.log('service page :  ', error)
		}
	}

	// automatically run this function
	useEffect(() => {
		useService()
	}, [])

	// End : fetch course data from backend

	const responsive = {
		extraLarge: {
			breakpoint: { max: 3000, min: 1324 },
			items: 4,
			slidesToSlide: 1, // optional, default to 1.
		},
		large: {
			breakpoint: { max: 1324, min: 1005 },
			items: 3,
			slidesToSlide: 1, // optional, default to 1.
		},
		medium: {
			breakpoint: { max: 1005, min: 700 },
			items: 2,
			slidesToSlide: 1, // optional, default to 1.
		},
		small: {
			breakpoint: { max: 700, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
		},
	}

	return (
		<div className="homeCardSection">
			<h1>Free Offered Courses</h1>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
				perspiciatis alias eaque tenetur debitis inventore facilis cupiditate
				amet dolore dolor!
			</p>
			<div className="cardBox">
				<Carousel
					responsive={responsive}
					removeArrowOnDeviceType={[
						// "superLargeDesktop",
						// "desktop",
						'tablet',
						'mobile',
					]}
				>
					{freeCourse.map((item, index) => {
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
				</Carousel>
			</div>
		</div>
	)
}

export default HomeCard
