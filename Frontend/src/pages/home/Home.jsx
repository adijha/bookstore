import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../store/Auth';
import { ShoppingCart } from 'lucide-react';

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { getToken, themeColor } = useAuth();

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId, quantity: 1 }),
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
    <div className={`min-h-screen ${themeColor === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to BookStore</h1>
        <p className="text-lg mb-8">
          Discover a world of knowledge and imagination in our curated collection of books.
          From bestsellers to hidden gems, find your next great read here!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className={`rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 ${themeColor === 'dark' ? 'bg-gray-700' : 'bg-white'}`}
            >
              <img
                src={book.imageUrl || `https://source.unsplash.com/random/300x400?book&sig=${book._id}`}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="mb-2">{book.author}</p>
                <p className="text-sm mb-4">{book.description.substring(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${book.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(book._id)}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
