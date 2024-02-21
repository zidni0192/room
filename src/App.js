import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './layout';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Client from './pages/Clients';
import BookingRooms from './pages/BookingRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />} >
          <Route path="" index element={<Home />} />
          <Route path="/rooms" index element={<Rooms />} />
          <Route path="/clients" index element={<Client />} />
          <Route path="/booking-room" index element={<BookingRooms />} />
          <Route path="*" index element={<Navigate to={'/'} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
