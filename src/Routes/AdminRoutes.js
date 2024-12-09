import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../Pages/AdminDashboard'
import UserManagement from '../Components/UserManagement'
import HotelManagement from '../Components/HotelManagement'
import BookingManagement from '../Components/BookingManagement'
import AddUser from '../Pages/AddUser'
import EditUser from '../Pages/EditUser'
import AddHotel from '../Pages/AddHotel'
import EditHotel from '../Pages/EditHotel'
import ReviewManagement from '../Components/ReviewManagement'

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<AdminDashboard />}/>
        <Route path="/users" element={<UserManagement />} />
        <Route path="/hotels" element={<HotelManagement />} />
        <Route path="/bookings" element={<BookingManagement />} />
        <Route path="/reviews" element={<ReviewManagement />} />
        <Route path="/users/adduser" element={<AddUser />} />
        <Route path="/users/updateuser/:id" element={<EditUser />} />
        <Route path="/hotels/addhotel" element={<AddHotel />} />
        <Route path="/hotels/updatehotel/:id" element={<EditHotel />} />
        

    </Routes>
  )
}

export default AdminRoutes