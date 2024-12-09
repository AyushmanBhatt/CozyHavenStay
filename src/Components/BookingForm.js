import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css"; 
import "./BookingForm.css";

const BookingForm = ({ isOpen, onClose, hotelDetails }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roomType: hotelDetails.rooms[0]?.roomType || "",
    numRooms: 1,
    numAdults: 1,
    numChildren: 0,
    arrivalDate: "",
    departureDate: "",
    aadharImageLink: "",
  });

  const [errors, setErrors] = useState({});
  const modalContentRef = useRef(null);

  // Calculate the total bill
  const calculateBill = () => {
    const room = hotelDetails.rooms.find((r) => r.roomType === formData.roomType);
    if (!formData.arrivalDate || !formData.departureDate) return 0;
    const days =
      Math.ceil(
        (new Date(formData.departureDate) - new Date(formData.arrivalDate)) / (1000 * 60 * 60 * 24)
      ) || 1;
    return room ? room.baseFare * formData.numRooms * days : 0;
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = "Name is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    if (!formData.phone) formErrors.phone = "Phone number is required.";
    if (!formData.arrivalDate) formErrors.arrivalDate = "Arrival date is required.";
    if (!formData.departureDate) formErrors.departureDate = "Departure date is required.";
    if (new Date(formData.arrivalDate) >= new Date(formData.departureDate))
      formErrors.dateRange = "Arrival date must be before the departure date.";
    if (!formData.aadharImageLink) formErrors.aadharImageLink = "Aadhar image link is required.";

    const room = hotelDetails.rooms.find((r) => r.roomType === formData.roomType);
    if (room) {
      const maxOccupancyAllowed = room.maxOccupancy * formData.numRooms;
      const totalGuests = parseInt(formData.numAdults) + parseInt(formData.numChildren);

      if (totalGuests > maxOccupancyAllowed) {
        formErrors.maxOccupancy = `The total number of adults and children cannot exceed ${maxOccupancyAllowed} for the selected number of rooms.`;
      }
    }

    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmBooking = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      modalContentRef.current.scrollTop = 0;
    } else {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Please login to confirm the booking.");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload?.sub;

        if (!username) {
          toast.error("Invalid token. Please login again.");
          return;
        }

        axios.get(`http://localhost:8080/api/users/getuserbyusername/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then(response => {
          const userId = response.data.id;
          if (!userId) {
            toast.error("Invalid token. Please login again.");
            return;
          }

          const bookingData = {
            userId: userId,
            hotelId: hotelDetails.id,
            roomId: hotelDetails.rooms.find((r) => r.roomType === formData.roomType)?.id,
            noOfRooms: formData.numRooms,
            noOfAdults: formData.numAdults,
            noOfChildren: formData.numChildren,
            phoneNo: formData.phone,
            totalBill: calculateBill(),
            roomType: formData.roomType,
            name: formData.name,
            email: formData.email,
            arrivalDate: formData.arrivalDate,
            departureDate: formData.departureDate,
            aadharImg: formData.aadharImageLink,
          };
          console.log("Booking Data:", bookingData);

          axios.post("http://localhost:8080/api/bookings/createbooking", bookingData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 201) {
              toast.success(`Booking confirmed for ${formData.name}. Total bill: $${calculateBill()}`);
              onClose();
            } else {
              toast.error("Failed to confirm booking. Please try again.");
            }
          })
          .catch((error) => {
            console.error("Booking error:", error);
            toast.error("An error occurred while confirming the booking.");
          });
        })
        .catch((error) => {
          console.error("Error fetching user ID:", error);
          toast.error("Failed to fetch user information.");
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("An error occurred while processing your token.");
      }
    }
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      roomType: hotelDetails.rooms[0]?.roomType || prevFormData.roomType,
    }));
  }, [hotelDetails]);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} className="booking-modal">
        <div className="header">
          <div className="hotel-banner">
            <img
              src={hotelDetails.image}
              alt={hotelDetails.name}
              className="hotel-image"
            />
          </div>
          <h1>{hotelDetails.name}</h1>
          <p>Experience something new every moment</p>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="form-errors">
            <ul>
              {Object.keys(errors).map((key) => (
                <li key={key}>
                  <span className="error-message">{errors[key]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form className="booking-form" ref={modalContentRef}>
          <div className="form-row">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Room Type:
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
              >
                {hotelDetails.rooms.map((room, index) => (
                  <option key={index} value={room.roomType}>
                    {room.roomType} - ${room.baseFare}/night
                  </option>
                ))}
              </select>
            </label>
            <label>
              Number of Rooms:
              <input
                type="number"
                name="numRooms"
                value={formData.numRooms}
                onChange={handleInputChange}
                min="1"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Number of Adults:
              <input
                type="number"
                name="numAdults"
                value={formData.numAdults}
                onChange={handleInputChange}
                min="1"
              />
            </label>
            <label>
              Number of Children:
              <input
                type="number"
                name="numChildren"
                value={formData.numChildren}
                onChange={handleInputChange}
                min="0"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Arrival Date:
              <input
                type="date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Departure Date:
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Aadhar Image Link:
              <input
                type="text"
                name="aadharImageLink"
                value={formData.aadharImageLink}
                onChange={handleInputChange}
              />
            </label>
          </div>

          
          <div className="bill-section">
            <h3>Total Bill: ${calculateBill()}</h3>
          </div>

          <div className="form-actions">
          <button type="button" onClick={handleConfirmBooking}>
            Confirm Booking
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
        </form>
      </Modal>
    </>
  );
};

export default BookingForm;




