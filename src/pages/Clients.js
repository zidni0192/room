import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../instance';

const ClientCRUD = () => {
  const { register, handleSubmit, reset } = useForm();
  const [clients, setClients] = useState([]);
  const [editClient, setEditClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchClients();
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

  const createClient = async (data) => {
    try {
      setIsLoading(true);
      await axiosInstance.post('/clients', data);
      fetchClients();
      reset();
      setIsLoading(false);
    } catch (error) {
      console.error('Error creating client:', error);
      setIsLoading(false);
    }
  };

  const updateClient = async (id, data) => {
    try {
      setIsLoading(true);
      await axiosInstance.put(`/clients/${id}`, data);
      fetchClients();
      setEditClient(null);
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating client:', error);
      setIsLoading(false);
    }
  };

  const deleteClient = async (id) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/clients/${id}`);
      fetchClients();
      setIsLoading(false);
    } catch (error) {
      console.error('Error deleting client:', error);
      setIsLoading(false);
    }
  };

  const handleCreateClient = (data) => {
    createClient(data);
  };

  const handleUpdateClient = (id, data) => {
    updateClient(id, data);
  };

  const handleDeleteClient = (id) => {
    deleteClient(id);
  };

  const handleEdit = (client) => {
    setEditClient(client);
  };

  const handleCancelEdit = () => {
    setEditClient(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Clients</h1>
      <div>
        <h2 className="text-xl mb-2">Add New Client</h2>
        <form onSubmit={handleSubmit(handleCreateClient)} className="flex flex-col md:flex-row mb-4">
          <input type="text" name="name" placeholder="Name" {...register("name")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
          <input type="email" name="email" placeholder="Email" {...register("email")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
          <input type="text" name="phone" placeholder="Phone" {...register("phone")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
          <input type="number" name="credit" placeholder="Credit" {...register("credit")} className="mb-2 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add Client</button>
        </form>
        <h2 className="text-xl mb-2">Clients List</h2>
        <ul>
          <li className="flex flex-col md:flex-row items-center justify-between bg-gray-200 rounded-lg px-4 py-2 mb-2 font-bold">
            <div>Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Credit</div>
            <div>Actions</div>
          </li>
          {clients.map(client => (
            <li key={client.id} className="flex flex-col md:flex-row items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mb-2">
              {editClient && editClient.id === client.id ? (
                <>
                  <input type="text" name="name" defaultValue={editClient.name} {...register("name")} className="mb-2 md:mb-0 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                  <input type="email" name="email" defaultValue={editClient.email} {...register("email")} className="mb-2 md:mb-0 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                  <input type="text" name="phone" defaultValue={editClient.phone} {...register("phone")} className="mb-2 md:mb-0 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                  <input type="number" name="credit" defaultValue={editClient.credit} {...register("credit")} className="mb-2 md:mb-0 md:mr-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                  <button onClick={handleSubmit((data) => handleUpdateClient(editClient.id, data))} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Update</button>
                  <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
                </>
              ) : (
                <>
                  <div className="mb-2 md:mb-0">{client.name}</div>
                  <div className="mb-2 md:mb-0">{client.email}</div>
                  <div className="mb-2 md:mb-0">{client.phone}</div>
                  <div className="mb-2 md:mb-0">{client.credit}</div>
                  <div>
                    <button onClick={() => handleEdit(client)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Edit</button>
                    <button onClick={() => handleDeleteClient(client.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
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

export default ClientCRUD;
