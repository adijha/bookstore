import React from 'react'
import { useAuth } from '../../store/Auth'

const About = () => {
	const { themeColor } = useAuth()

	return (
		<div
			className={`min-h-screen ${
				themeColor === 'dark'
					? 'bg-gray-800 text-white'
					: 'bg-gray-100 text-black'
			}`}
		>
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold mb-4">About Us</h1>
				<div
					className={`rounded-lg shadow-md overflow-hidden p-6 ${
						themeColor === 'dark' ? 'bg-gray-700' : 'bg-white'
					}`}
				>
					<h2 className="text-3xl font-semibold mb-4">Welcome to BookStore</h2>
					<p className="text-lg mb-4">
						At BookStore, we believe that books have the power to transform
						lives. Established in 2004, our mission has always been to provide a
						vast collection of books that cater to every reader's taste. Whether
						you're a fan of fiction, non-fiction, mystery, romance, or any other
						genre, we have something for you.
					</p>
					<p className="text-lg mb-4">
						Our store is committed to offering the best prices, a friendly
						atmosphere, and exceptional customer service. We are passionate
						about promoting the joy of reading and making books accessible to
						everyone.
					</p>
					<p className="text-lg mb-4">
						Join us on our journey to create a vibrant community of book lovers.
						Visit us, explore our collection, and discover the next book that
						will captivate your mind and soul.
					</p>
					<p className="text-lg">
						Thank you for choosing BookStore. Happy reading!
					</p>
				</div>
			</div>
		</div>
	)
}

export default About
