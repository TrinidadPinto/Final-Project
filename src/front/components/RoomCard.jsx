import React from 'react';
import { Link } from 'react-router-dom';
import placeholderImg from '../assets/img/elementor-placeholder-image.webp';

const RoomCard = ({ room }) => {
    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
                <img src={placeholderImg} className="card-img-top" alt="Room" style={{objectFit: 'cover', height: '180px'}} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">{room.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{room.address}</h6>
                    <p className="card-text flex-grow-1">{room.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="fw-bold text-primary">${room.price.toLocaleString('es-CO')} COP</span>
                        <Link to={`/roomdetail/${room.id}`} className="btn btn-outline-primary btn-sm">
                            Ver detalles
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
