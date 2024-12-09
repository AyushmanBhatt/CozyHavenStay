import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div style={{ width: "250px", background: "#f4f4f4", padding: "10px" }}>
      <h3>Admin Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">User Management</Link></li>
        <li><Link to="/admin/hotels">Hotel Management</Link></li>
        <li><Link to="/admin/bookings">Booking Management</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
