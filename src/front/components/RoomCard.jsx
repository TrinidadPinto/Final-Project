import React from "react";
import { Link } from "react-router-dom";
import placeholderImg from "../assets/img/elementor-placeholder-image.webp";

const RoomCard = ({ room }) => {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
            <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden">
                <Link
                    to={`/roomdetail/${room.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <img
                        src={placeholderImg}
                        className="card-img-top"
                        alt={room.title}
                        style={{
                            objectFit: "cover",
                            height: "180px",
                            width: "100%",
                        }}
                    />
                </Link>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-1 text-truncate">{room.title}</h5>
                    <p className="card-text small text-muted mb-2 text-truncate">
                        {room.address || "Dirección no disponible"}
                    </p>
                    <p className="card-text flex-grow-1" style={{ minHeight: 40 }}>
                        {room.description?.length > 60
                            ? room.description.slice(0, 60) + "..."
                            : room.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="fw-bold text-primary">
                            ${room.price?.toLocaleString("es-CO") || room.price} COP
                        </span>
                        <Link
                            to={`/roomdetail/${room.id}`}
                            className="btn btn-outline-primary btn-sm"
                        >
                            Ver detalles
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
