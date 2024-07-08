import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Credentials.css';
import { toast } from 'react-toastify';
import { useAuth } from '../../store/Auth';

const URL = 'http://localhost:9000/api/v1/bookstore/login';

const Login = () => {
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserLogin(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userLogin),
            });

            const data = await response.json();

            if (response.ok) {
                storeTokenInLS(data.token);

                setUserLogin({
                    email: '',
                    password: '',
                });

                toast.success('Login Successful', {
                    autoClose: 1000,
                });

                navigate('/');
            } else {
                toast.error(data.message || 'Login failed', {
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('An error occurred. Please try again.', {
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="credentialsSection login">
            <h2>Sign In</h2>
            <p>Please Login To Continue</p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
                perferendis magnam soluta eum sequi officiis adipisci laboriosam,
                aliquid vel sed autem expedita molestias esse. Ullam explicabo
                recusandae voluptatibus! Voluptatem, ab.
            </p>

            <div className="loginForm">
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={handleInput}
                        value={userLogin.email}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleInput}
                        value={userLogin.password}
                    />
                    <p>
                        Not Registered? <Link to="/register">Register Now</Link>
                    </p>

                    <div>
                        <input type="submit" value="Login" className="btn" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;