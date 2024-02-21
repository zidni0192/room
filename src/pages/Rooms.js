import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../instance';

const RoomCRUD = () => {
  const { register, handleSubmit, reset } = useForm();
  const [rooms, setRooms] = useState([]);
  const [editRoom, setEditRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

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

  const createRoom = async (data) => {
    try {
      setIsLoading(true);
      await axiosInstance.post('/rooms', data);
      fetchRooms();
      reset();
      setIsLoading(false);
    } catch (error) {
      console.error('Error creating room:', error);
      setIsLoading(false);
    }
  };

  const updateRoom = async (id, data) => {
    try {
      setIsLoading(true);
      await axiosInstance.put(`/rooms/${id}`, data);
      fetchRooms();
      setEditRoom(null);
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating room:', error);
      setIsLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/rooms/${id}`);
      fetchRooms();
      setIsLoading(false);
    } catch (error) {
      console.error('Error deleting room:', error);
      setIsLoading(false);
    }
  };

  const handleCreateRoom = (data) => {
    createRoom(data);
  };

  const handleUpdateRoom = (id, data) => {
    updateRoom(id, data);
  };

  const handleDeleteRoom = (id) => {
    deleteRoom(id);
  };

  const handleEdit = (room) => {
    setEditRoom(room);
  };

  const handleCancelEdit = () => {
    setEditRoom(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Rooms</h1>
      <div>
        <h2 className="text-xl mb-2">Add New Room</h2>
        <form onSubmit={handleSubmit(handleCreateRoom)} className="flex flex-col md:flex-row mb-4">
          <input type="text" name="roomName" placeholder="Room Name" {...register("roomName")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
          <input type="number" name="costPerHour" placeholder="Cost Per Hour" {...register("costPerHour")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add Room</button>
        </form>
        <h2 className="text-xl mb-2">Rooms List</h2>
        <ul>
          <li className="flex flex-col md:flex-row items-center justify-between bg-gray-200 rounded-lg px-4 py-2 mb-2 font-bold">
            <div>Room Name</div>
            <div>Cost Per Hour</div>
            <div>Actions</div>
          </li>
          {rooms.map(room => (
            <li key={room.id} className="flex flex-col md:flex-row items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mb-2">
              {editRoom && editRoom.id === room.id ? (
                <>
                  <input type="text" name="roomName" defaultValue={editRoom.roomName} {...register("roomName")} className="mb-2 md:mb-0 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                  <input type="number" name="costPerHour" defaultValue={editRoom.costPerHour} {...register("costPerHour")} className="mb-2 md:mb-0 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                  <button onClick={handleSubmit((data) => handleUpdateRoom(editRoom.id, data))} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Update</button>
                  <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
                </>
              ) : (
                <>
                  <div className="mb-2 md:mb-0">{room.roomName}</div>
                  <div className="mb-2 md:mb-0">{room.costPerHour}</div>
                  <div>
                    <button onClick={() => handleEdit(room)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Edit</button>
                    <button onClick={() => handleDeleteRoom(room.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomCRUD;
