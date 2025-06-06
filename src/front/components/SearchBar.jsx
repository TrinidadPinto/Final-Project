import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../hooks/useGlobalReducer";

const SearchBar = ({ setRoomsToShow }) => {
  const { store } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [isFiltered, setIsFiltered] = useState(false);

  const onSubmit = data => {
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);
    const results = store.rooms.filter((room) => {
      const matchesCity = room.city && room.city.toLowerCase().includes(data.destination.toLowerCase());
      const matchesGuests = room.capacity >= parseInt(data.guests);
      if (!room.bookings || room.bookings.length === 0) {
        return matchesCity && matchesGuests;
      }
      const isAvailable = !room.bookings.some(booking => {
        const bookingIn = new Date(booking.check_in);
        const bookingOut = new Date(booking.check_out);
        return bookingOut > checkInDate && bookingIn < checkOutDate;
      });
      return matchesCity && matchesGuests && isAvailable;
    });
    setRoomsToShow(results);
    setIsFiltered(true);
  };

  const handleClear = () => {
    setRoomsToShow(store.rooms);
    setIsFiltered(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-2 align-items-center justify-content-center rounded">
      <div className="col-6 col-md-2">
        <label className="form-label mb-1 small">Check-in</label>
        <input
          type="date"
          className="form-control"
          {...register("checkIn", { required: true })}
        />
        {errors.checkIn && (
          <small className="text-danger">El check-in es obligatorio</small>
        )}
      </div>
      <div className="col-6 col-md-2">
        <label className="form-label mb-1 small">Check-out</label>
        <input
          type="date"
          className="form-control"
          {...register("checkOut", { required: true })}
        />
        {errors.checkOut && (
          <small className="text-danger">El check-out es obligatorio</small>
        )}
      </div>
      <div className="col-12 col-md-4">
        <label className="form-label mb-1 small">Ciudad</label>
        <input
          type="text"
          className="form-control"
          placeholder="¿A dónde viajas?"
          {...register("destination", { required: true })}
        />
        {errors.destination && (
          <small className="text-danger">Debe elegir una ciudad</small>
        )}
      </div>
      <div className="col-6 col-md-2">
        <label className="form-label mb-1 small">Huéspedes</label>
        <input
          type="number"
          className="form-control"
          placeholder="2"
          min="1"
          {...register("guests", { required: true })}
        />
        {errors.guests && (
          <small className="text-danger">Al menos 1 huésped</small>
        )}
      </div>
      <div className="col-3 col-md-1 d-flex align-items-end">
        <button className="btn btn-primary w-100" type="submit">
          Filtrar
        </button>
      </div>
      {isFiltered && (
        <div className="col-3 col-md-1 d-flex align-items-end">
          <button type="button" className="btn btn-secondary w-100" onClick={handleClear}>
            X
          </button>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
