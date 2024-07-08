import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../store/Auth';


const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/v1/bookstore/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to load books. Please try again later.');
    }
  };

  const handleAddToCart = async (bookId) => {
    try {
      const token = getToken();
      console.log('Token being used:', token); // Debugging line

      if (!token) {
        toast.error('Please log in to add items to your cart.');
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:9000/api/v1/bookstore/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookId, quantity: 1 })
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Book added to cart successfully!');
        console.log('Cart updated:', data);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add book to cart');
      }
    } catch (error) {
      console.error('Error adding book to cart:', error);
      toast.error('An error occurred while adding the book to cart');
    }
  };

  return (
    <div className="homeCardSection">
      <h1>Welcome to BookStore</h1>
      <p>
        Discover a world of knowledge and imagination in our curated collection of books.
        From bestsellers to hidden gems, find your next great read here!
      </p>
      <div className="cardBox grid gridFourTemplate">
        {books.map((book) => (
          <div key={book._id} className="card">
            <div className="bookImage">
              <img src={book.imageUrl || `https://source.unsplash.com/random/200x300?book&sig=${book._id}`} alt={book.title} />
            </div>
            <div className="bookInfo">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
            <div className="bookDescription">
              <p>{book.description.substring(0, 100)}...</p>
            </div>
            <div className="bookActions">
              <span>${book.price.toFixed(2)}</span>
              <button onClick={() => handleAddToCart(book._id)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;