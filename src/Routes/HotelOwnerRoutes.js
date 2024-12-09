import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HotelOwnerDashboard from '../Pages/HotelOwnerDashboard'
import ManageHotel from '../Components/ManageHotel'
import ManageBookings from '../Components/ManageBookings'
import ManageRooms from '../Components/ManageRooms'
import ManageReviews from '../Components/ManageReviews'

const HotelOwnerRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<HotelOwnerDashboard />}/>
        <Route path="/hotels" element={<ManageHotel />}/>
        <Route path="/bookings" element={<ManageBookings />}/>
        <Route path="/rooms" element={<ManageRooms />}/>
        <Route path="/reviews" element={<ManageReviews />}/>

    </Routes>
  )
}

export default HotelOwnerRoutes