import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoading(false)
        } else {
            window.location.href = '/login'
        }
    }, [setLoading])

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload()
    };

    return loading ? null : (
        <>
            <div className="flex h-screen">
                <button className="lg:hidden absolute p-4 bg-gray-900 text-white" onClick={toggleSidebar}>
                    {isOpen ? '✕' : '☰'}
                </button>
                <div className={`lg:w-48 w-full h-full fixed lg:relative ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
                    <div className="bg-gray-800 text-white h-full lg:w-48 w-full flex flex-col">
                        <div className='flex justify-between border-b border-gray-700'>
                            <div className="p-4">Book</div>
                            <button className="lg:hidden p-4 bg-gray-900 text-white" onClick={toggleSidebar}>
                                {isOpen ? '✕' : '☰'}
                            </button>
                        </div>
                        <div className="flex-grow flex flex-col">
                            <div className="py-4">
                                <Link to="/home" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
                                <Link to="/rooms" className="block px-4 py-2 hover:bg-gray-700">Rooms</Link>
                                <Link to="/booking-room" className="block px-4 py-2 hover:bg-gray-700">Booking Room</Link>
                                <Link to="/clients" className="block px-4 py-2 hover:bg-gray-700">Clients</Link>
                            </div>
                            <div className="p-4 border-t border-gray-700 cursor-pointer" onClick={logout}>Logout</div>
                        </div>
                    </div>
                </div>
                <div className="flex-grow bg-gray-100">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
