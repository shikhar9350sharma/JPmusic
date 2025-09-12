import React from 'react'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const togglePass = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            toast("Invalid Credentials");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('https://music-api-gamma.vercel.app/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include' // 🔑 This sends and stores cookies
            });

            const data = await res.json();

            if (!res.ok) {
                toast(data.message || "Login failed");
                console.log('login failed', data)
                setLoading(false);
                return;
            }
            toast("Logged in successfully");
            setFormData({ username: '', password: '' });
            navigate('/app');
        } catch (err) {
            toast("Something went wrong");
            console.error(err);
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className='py-10 min-h-screen flex flex-col md:flex-row  items-center justify-normal md:justify-evenly '>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='hidden md:flex items-center gap-2'>
                        <div className='w-80 h-80'>
                            <img loading='lazy' className='h-full w-full object-cover' src="login.png" alt="img" />
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='border border-transparent md:border-gray-300 gap-4 flex flex-col text-left px-6 py-8 w-72  md:w-96 rounded-xl'>
                        <div className='flex items-center justify-center gap-2 mb-6'>
                            <img loading='lazy' className='h-8 md:h-12 ' src="app.svg" alt="img" />
                        </div>
                        <div>
                            {/* <label htmlFor='username' className="block text-sm font-medium mb-2" >Username</label> */}
                            <input
                                type="text"
                                id='username'
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder='Username'
                                autoComplete='username'
                                className='px-2 py-1 rounded-lg bg-white/10 w-full focus:outline-none focus:ring-2 focus:ring-white'
                            />
                        </div>
                        <div className='relative'>
                            {/* <label htmlFor='password' className="block text-sm font-medium mb-2" >Password</label> */}
                            <input
                                type={showPass ? 'text' : 'password'}
                                name="password"
                                id='password'
                                autoComplete='current-password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Password'
                                className='px-2 py-1 rounded-lg bg-white/10 w-full focus:outline-none focus:ring-2 focus:ring-white'
                            />
                            <button className='absolute top-1 right-5 text-gray-300' onClick={togglePass}>{showPass ? "hide" : "show"}</button>
                        </div>
                        {/* <button
                            disabled={loading}
                            type='submit'
                            className="w-full py-2 bg-gray-950 hover:bg-gray-900 rounded-lg text-white font-semibold transition duration-300"
                        >
                            Log in
                        </button> */}
                        <button
                            disabled={loading}
                            type='submit'
                            className="w-full py-2 bg-gray-950 hover:bg-gray-900 rounded-lg text-white font-semibold transition duration-300 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                    Logging in...
                                </>
                            ) : (
                                "Log in"
                            )}
                        </button>
                        <div className='flex items-center'>
                            <span className='border border-gray-500 h-[2px] w-1/2'></span>
                            <span className='mx-4'>OR</span>
                            <span className='border border-gray-500 h-[2px] w-1/2'></span>
                        </div>
                        <div className='flex flex-col items-center gap-6'>
                            <button className='font-semibold text-gray-300'>Forget Password?</button>
                            <span>Don't have account? <button onClick={() => navigate('/signup')} className='text-blue-500 font-semibold'>Sign Up</button></span>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Login
