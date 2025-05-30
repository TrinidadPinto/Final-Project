import React from "react";
import { useForm } from "react-hook-form";

const SearchBar = () => {
  const {
    register,
    handleSubmit,
   formState: { errors },
  } = useForm(); 

  const onSubmit = data => {
    console.log('Datos del formulario:', data);
    // Aquí podrías enviar los datos a una API, filtrar resultados, etc.
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)} className="row g-2 align-items-center justify-content-center rounded">
      <div className="col-6 col-md-2">
        <label className="form-label mb-1 small">Check-in</label>
        <input
          type="date"
          className="form-control"
          {...register("checkIn", { required: true })}
        />
        {errors.checkIn && (
          <small className="text-danger">Check-in is required</small>
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
          <small className="text-danger">Check-out is required</small>
        )}
      </div>
      <div className="col-12 col-md-4">
        <label className="form-label mb-1 small">Destination</label>
        <input
          type="text"
          className="form-control"
          placeholder="Where are you going?"
          {...register("destination", { required: true })}
        />
        {errors.destination && (
          <small className="text-danger">You must pick a destination</small>
        )}
      </div>
      <div className="col-6 col-md-2">
        <label className="form-label mb-1 small">Guests</label>
        <input
          type="number"
          className="form-control"
          placeholder="2"
          min="1"
          {...register("guests", { required: true })}
        />
        {errors.guests && (
          <small className="text-danger">At least 1 guest</small>
        )}
      </div>
      <div className="col-6 col-md-2 d-flex align-items-end">
        <button className="btn btn-primary w-100" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
