import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/auth/login', data);
            setLoading(false);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert('Login success');
                navigate('/home');
            } else {
                setError('email', { type: 'manual', message: 'Invalid email or password' });
                setError('password', { type: 'manual', message: 'Invalid email or password' });
            }
        } catch (error) {
            setError('email', { type: 'manual', message: 'Invalid email or password' });
            setError('password', { type: 'manual', message: 'Invalid email or password' });
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} placeholder="Email address" {...register('email')} />
                            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} placeholder="Password" {...register('password')} />
                            {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={loading} className={`${loading ? 'opacity-50 cursor-not-allowed' : ''} group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
