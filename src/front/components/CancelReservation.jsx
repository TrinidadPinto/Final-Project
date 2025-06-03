
import React, { useState } from "react";

const CancelBooking = ({ bookingId }) => {
  const [cancelReservation, setCancelReservation] = useState([]);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState([false])

  const handleCancelingReservation = async () => {

    setCancelReservation(true);
    setError(null);
    setSelectedReservation(true);



    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/CancelBooking/${bookingId}`,{
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },

      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log('An error occurred, please try again!')
    }


  }
  return (

    <div>
      {error && <p className="error"> {error}</p>}
      {cancelReservation && <p>Your reservation has been canceled!</p>}
      <button className="btn btn-primary"
        onClick={handleCancelingReservation}
        disabled={selectedReservation}>

        Cancel
      </button>

    </div>


  )

};
 export default CancelBooking;