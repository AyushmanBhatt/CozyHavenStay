import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import UserRoutes from './UserRoutes'
import AdminRoutes from './AdminRoutes'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import AllHotels from '../Pages/AllHotels'
import HotelDetail from '../Pages/HotelDetail'
import HotelsByLocation from '../Pages/HotelsByLocation'
import HotelOwnerRoutes from './HotelOwnerRoutes'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/allhotels" element={<AllHotels />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/hotelsbylocation" element={<HotelsByLocation />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/hotelowner/*" element={<HotelOwnerRoutes />} />
    </Routes>
  )
}

export default AppRoutes