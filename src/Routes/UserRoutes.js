import React from 'react'

import Home from '../Pages/Home';
import { Route, Routes } from 'react-router-dom';
import SearchResults from '../Components/SearchResults';
import UserProfile from '../Pages/UserProfile';

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<Home />}/>
        <Route path="/search" element={<SearchResults />}/>
        <Route path="/userprofile/:userId" element={<UserProfile />}/>
    </Routes>
  )
}

export default UserRoutes