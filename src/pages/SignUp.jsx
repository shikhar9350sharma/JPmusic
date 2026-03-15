import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
    const [formData, setFormData] = useState({ email: '', username: '', password: '', fullName: '', });
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
        if (!formData.email || !formData.username || !formData.password || !formData.fullName) {
            toast("Invalid Credentials");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('https://music-api-gamma.vercel.app/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include' // 🔑 This sends and stores cookies
            });

            const data = await res.json();

            if (!res.ok) {
                toast(data.message || "Signup failed");
                setLoading(false);
                return;
            }

            toast("Account created successfully");
            setFormData({ email: '', username: '', password: '', fullName: '' });
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
            <div className='relative py-10 min-h-screen flex items-center justify-center overflow-hidden'>
                <div className='relative flex items-center justify-center'>
                    
                    {/* Ukulele Image: Anchored relative to the bottom-left of the form wrapper */}
                    <div className=' z-50 absolute -left-[70px] -bottom-[5px] lg:-left-[195px] lg:-bottom-[30px] transform -rotate-[29deg]'>
                        <div className='w-40 h-40 lg:w-80 lg:h-80 drop-shadow-2xl'>
                            <img loading='lazy' className='h-full w-full object-contain' src="ukulele.png" alt="Ukulele" />
                        </div>
                    </div>
    
                    {/* Headset Image: Anchored relative to the top-right of the form wrapper */}
                    <div className=' z-50 absolute -right-[40px] -top-[28px] lg:-right-[100px] lg:-top-[40px] transform rotate-[29deg]'>
                        <div className='w-28 h-28 lg:w-44 lg:h-44 drop-shadow-2xl'>
                            <img loading='lazy' className='h-full w-full object-contain' src="headset.png" alt="Headset" />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="relative z-10 bg-black rounded-xl">
                        <div className='border border-gray-300 gap-4 flex flex-col text-left px-6 py-8 w-72 md:w-96 rounded-xl'>
                            {/* JPmusic icon */}
                            <div className='flex items-center justify-center gap-2 mb-6'>
                                <img loading='lazy' className='h-8 md:h-12 ' src="app.svg" alt="img" />
                            </div>
                            {/* user icon */}
                            <div className='flex items-center justify-center p-1'>
                                <div className='rounded-full h-20 w-20'>
                                    <img loading='lazy' className='h-full w-full' src="user.png" alt="UserIcon" />
                                </div>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    id='email'
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='Email'
                                    autoComplete='email'
                                    className='px-2 py-1 rounded-lg bg-white/10 w-full focus:outline-none focus:ring-2 focus:ring-white'
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id='fullName'
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder='Full Name'
                                    className='px-2 py-1 rounded-lg bg-white/10 w-full focus:outline-none focus:ring-2 focus:ring-white'
                                />
                            </div>
                            <div>
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
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    id='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder='Password'
                                    className='px-2 py-1 rounded-lg bg-white/10 w-full focus:outline-none focus:ring-2 focus:ring-white'
                                />
                                <button type="button" className='absolute top-1 right-5 text-gray-300' onClick={togglePass}>{showPass ? "hide" : "show"}</button>
                            </div>
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
                                        Signing up...
                                    </>
                                ) : (
                                    "Sign up"
                                )}
                            </button>
                            <div className='flex items-center'>
                                <span className='border border-gray-500 h-[2px] w-1/2'></span>
                                <span className='mx-4'>OR</span>
                                <span className='border border-gray-500 h-[2px] w-1/2'></span>
                            </div>
                            <div className='flex flex-col items-center gap-6 text-xs'>
                                <span>Already have an account? <button type="button" onClick={() => navigate('/login')} className='text-blue-500 font-semibold'>Log in</button></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;