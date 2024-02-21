import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../instance';

const BookingRooms = () => {
    const { register, handleSubmit, reset } = useForm();
    const [clients, setClients] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomUsages, setRoomUsages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchClients();
        fetchRooms();
        fetchRoomUsages();
    }, []);

    const fetchClients = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/clients');
            setClients(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching clients:', error);
            setIsLoading(false);
        }
    };

    const fetchRooms = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/rooms');
            setRooms(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            setIsLoading(false);
        }
    };

    const fetchRoomUsages = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/rooms/usages');
            setRoomUsages(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching room usages:', error);
            setIsLoading(false);
        }
    };

    const handleBooking = async (data) => {
        try {
            setIsLoading(true);
            await axiosInstance.post('/rooms/booking', data);
            reset();
            fetchRoomUsages();
            setIsLoading(false);
        } catch (error) {
            console.error('Error booking room:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4">Booking Rooms</h1>
            <div>
                <h2 className="text-xl mb-2">Book a Room</h2>
                <form onSubmit={handleSubmit(handleBooking)} className="flex flex-col md:flex-row mb-4">
                    <select name="clientId" {...register("clientId")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500">
                        <option value="">Select Client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                    <select name="roomId" {...register("roomId")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500">
                        <option value="">Select Room</option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>{room.roomName}</option>
                        ))}
                    </select>
                    <input type="datetime-local" name="startTime" {...register("startTime")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                    <input type="datetime-local" name="endTime" {...register("endTime")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                    <input type="datetime-local" name="bookingDate" {...register("bookingDate")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                    <input type="number" name="quotaUsed" placeholder="Quota Used" {...register("quotaUsed")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Book Room</button>
                </form>
            </div>
            <div>
                <h2 className="text-xl mb-2">Room Usages</h2>
                <ul>
                    <li className="flex flex-col md:flex-row items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mb-2">
                        <div>Client</div>
                        <div>Room</div>
                        <div>Start Time</div>
                        <div>End Time</div>
                        <div>Quota Used</div>
                    </li>
                    {roomUsages.map(roomUsage => (
                        <li key={roomUsage.id} className="flex flex-col md:flex-row items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mb-2">
                            <div>{roomUsage.client.name}</div>
                            <div>{roomUsage.room?.roomName}</div>
                            <div>{new Date(roomUsage.startTime).toLocaleString()}</div>
                            <div>{new Date(roomUsage.endTime).toLocaleString()}</div>
                            <div>{roomUsage.quotaUsed}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BookingRooms;
