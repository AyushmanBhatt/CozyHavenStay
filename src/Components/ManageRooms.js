import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageRooms.css';
import { Link } from 'react-router-dom';

const ManageRooms = () => {
  const [ownerId, setOwnerId] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [roomForm, setRoomForm] = useState({
    roomId: '',  
    roomType: '',
    baseFare: '',
    maxOccupancy: '',
    ac: true,
    features: [],
  });

  useEffect(() => {
    const fetchOwnerId = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8080/auth/getOwnerId', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOwnerId(response.data);
      } catch (error) {
        console.error('Error fetching owner ID:', error);
      }
    };
    fetchOwnerId();
  }, []);

  useEffect(() => {
    if (!ownerId) return;
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:8080/api/hotels/gethotelbyownerid/${ownerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, [ownerId]);

  const fetchRooms = async (hotelId) => {
    setSelectedHotelId(hotelId);
    setRooms([]); // Clear current room data
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get(`http://localhost:8080/api/hotels/${hotelId}/rooms/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`http://localhost:8080/api/rooms/deleteroombyid/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
      setMessage('Room deleted successfully!');
    } catch (error) {
      console.error('Error deleting room:', error);
      setMessage('Failed to delete room.');
    }
  };

  const handleAddRoom = async () => {
    if (!roomForm.roomType || !roomForm.baseFare || !roomForm.maxOccupancy) {
      setMessage('Please fill in all the fields.');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post(
        `http://localhost:8080/api/hotels/${selectedHotelId}/rooms`,
        { 
          ...roomForm, 
          hotel_id: selectedHotelId, // Pass hotelId along with room data
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRooms([...rooms, response.data]);
      setMessage('Room added successfully!');
      resetRoomForm();
    } catch (error) {
      console.error('Error adding room:', error);
      setMessage('Failed to add room.');
    }
  };

  const handleUpdateRoom = async () => {
    if (!roomForm.roomType || !roomForm.baseFare || !roomForm.maxOccupancy) {
      setMessage('Please fill in all the fields.');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(
        `http://localhost:8080/api/rooms/updateroombyid/${roomForm.roomId}`,
        { 
          ...roomForm, 
          hotel: { id: selectedHotelId }, // Pass hotelId along with room data
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRooms(
        rooms.map((room) =>
          room.id === roomForm.roomId ? { ...room, ...roomForm } : room
        )
      );
      setMessage('Room updated successfully!');
      resetRoomForm();
    } catch (error) {
      console.error('Error updating room:', error);
      setMessage('Failed to update room.');
      console.log(roomForm,selectedHotelId);
    }
  };

  const resetRoomForm = () => {
    setRoomForm({
      roomId: '',  
      roomType: '',
      baseFare: '',
      maxOccupancy: '',
      ac: true,
      features: [],
    });
  };

  const handleEditRoom = (room) => {
    setRoomForm({
      roomId: room.id,
      roomType: room.roomType,
      baseFare: room.baseFare,
      maxOccupancy: room.maxOccupancy,
      ac: room.ac,
      features: room.features,
    });
  };

  return (<>
  <div className="sidebar">
          <ul>
            <li><Link to="/hotelowner/dashboard">Dashboard</Link></li>
            <li><Link to="/hotelowner/hotels">Hotels</Link></li>
            <li><Link to="/hotelowner/bookings">Bookings</Link></li>
            <li><Link to="/hotelowner/rooms">Rooms</Link></li>
            <li><Link to="/hotelowner/reviews">Reviews</Link></li>
          </ul>
        </div>
    <div className="manage-rooms">
      <h1>Manage Rooms</h1>
      {message && <p className="message">{message}</p>}

      <div className="hotel-selector">
        <h2>Select a Hotel</h2>
        <div className="hotel-cards">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className={`hotel-card2 ${selectedHotelId === hotel.id ? 'active' : ''}`}
              onClick={() => fetchRooms(hotel.id)}
            >
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedHotelId ? (
        <div className="rooms-section">
          <h2>Rooms for Selected Hotel</h2>
          <div className="room-form">
            <h3>{roomForm.roomId ? 'Update Room' : 'Add New Room'}</h3>
            
            <input
              type="text"
              placeholder="Room Type"
              value={roomForm.roomType}
              onChange={(e) => setRoomForm({ ...roomForm, roomType: e.target.value })}
            />
            <input
              type="number"
              placeholder="Base Fare"
              value={roomForm.baseFare}
              onChange={(e) => setRoomForm({ ...roomForm, baseFare: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max Occupancy"
              value={roomForm.maxOccupancy}
              onChange={(e) => setRoomForm({ ...roomForm, maxOccupancy: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={roomForm.isAC}
                onChange={(e) => setRoomForm({ ...roomForm, ac: e.target.checked })}
              />
              AC
            </label>
            <input
              type="text"
              placeholder="Room Features"
              value={roomForm.features.join(', ')}
              onChange={(e) => setRoomForm({ ...roomForm, features: e.target.value.split(',') })}
            />
            {roomForm.roomId ? (
              <button onClick={handleUpdateRoom}>Update Room</button>
            ) : (
              <button onClick={handleAddRoom}>Add Room</button>
            )}
          </div>
          {rooms.length === 0 ? (
            <p>No rooms available for this hotel.</p>
          ) : (<>
            <p>Available Rooms</p>
            <table className="rooms-table">
              <thead>
                <tr>
                  <th>Room ID</th>
                  <th>Room Type</th>
                  <th>Max Occupancy</th>
                  <th>Base Fare</th>
                  <th>AC</th>
                  <th>Features</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.maxOccupancy}</td>
                    <td>{room.baseFare}</td>
                    <td>{room.ac ? 'Yes' : 'No'}</td>
                    <td>{room.features.join(', ')}</td>
                    <td>
                      <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                      <button onClick={() => handleEditRoom(room)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </>
          )}
        </div>
      ) : (
        <p>Please select a hotel to manage rooms.</p>
      )}
    </div>
    </>
  );
};

export default ManageRooms;
