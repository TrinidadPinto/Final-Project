import React from "react";
import placeholderImg from "../assets/img/elementor-placeholder-image.webp";

const Booking = ({ booking, onDelete }) => {
    const { room } = booking;
    return (
        <div className="card mb-3 shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="row g-0 align-items-center">
                <div className="col-md-4">
                    <img
                        src={placeholderImg}
                        className="img-fluid h-100 w-100 object-fit-cover"
                        alt={room?.title || "Habitación"}
                        style={{ minHeight: 150, objectFit: "cover" }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title mb-1">{room?.title || "Habitación"}</h5>
                        <p className="card-text mb-1 text-muted small">{room?.address || "Dirección no disponible"}</p>
                        <div className="mb-2">
                            <span className="badge bg-info text-dark me-2">Check-in: {booking.check_in}</span>
                            <span className="badge bg-info text-dark">Check-out: {booking.check_out}</span>
                        </div>
                        <p className="card-text mb-0"><strong>Huéspedes:</strong> {booking.guests}</p>
                        <p className="card-text"><strong>Precio:</strong> ${room?.price?.toLocaleString("es-CO") || room?.price} COP</p>
                        <button className="btn btn-danger mt-2" onClick={() => onDelete && onDelete(booking.id)}>
                            Cancelar reserva
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
