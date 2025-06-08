import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import RoomCard from "../components/RoomCard";
import Booking from "../components/Booking";
import EditProfile from "./EditProfile";
import EditRoom from "../components/EditRoom";

const Profile = () => {

    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [showEditRoom, setShowEditRoom] = useState(false);
    const [roomToEdit, setRoomToEdit] = useState(null);

    let { user_id } = useParams();

    const fetchUser = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${user_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                }
            });
            if (!res.ok) throw new Error("Error al obtener usuario");
            const data = await res.json();
            setUser(data);
        } catch (error) {
            setUser(null);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser();
        // Obtener habitaciones del usuario
        const fetchRooms = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/my-rooms`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                    }
                });
                if (!res.ok) throw new Error("Error al obtener habitaciones");
                const data = await res.json();
                setRooms(data);
            } catch (error) {
                setRooms([]);
                console.error(error);
            }
        };
        fetchRooms();
    }, [user_id]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/my-bookings`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                    }
                });
                if (!res.ok) throw new Error("Error al obtener reservas");
                const data = await res.json();
                setBookings(data);
            } catch (error) {
                setBookings([]);
                console.error(error);
            }
        };
        fetchBookings();
    }, [user_id]);

    const handleDeleteBooking = async (bookingId) => {
        if (!window.confirm("¿Estás seguro de cancelar esta reserva?")) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete-booking/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setBookings(prev => prev.filter(b => b.id !== bookingId));
            } else {
                alert(data.msg || "No se pudo cancelar la reserva");
            }
        } catch (error) {
            alert("Error de conexión al cancelar la reserva");
        }
    };

    const handleDeleteRoom = async (roomId) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta habitación?")) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/room/${roomId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                alert("Habitación eliminada correctamente");
                setRooms(prev => prev.filter(r => r.id !== roomId));
            } else {
                alert(data.msg || "No se pudo eliminar la habitación");
            }
        } catch (error) {
            alert("Error de conexión al eliminar la habitación");
        }
    };

    const handleEditRoom = (room) => {
        setRoomToEdit(room);
        setShowEditRoom(true);
    };

    const handleRoomUpdated = () => {
        setShowEditRoom(false);
        setRoomToEdit(null);
        // Refresca habitaciones
        fetchRooms();
    };

    return (
        <div className="container mt-5">
            <div className="card mx-auto shadow" style={{ maxWidth: '900px', borderRadius: '16px' }}>
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h2 className="mb-0">Perfil de Usuario</h2>
                        <button className="btn btn-primary" onClick={() => setShowEditProfile(true)}>
                            Editar perfil
                        </button>
                    </div>
                    {error ? (
                        <p className="text-danger">Usuario no encontrado</p>
                    ) : (
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <span className="fw-bold">Nombre:</span>
                                <p>{user.name || 'Cargando...'}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <span className="fw-bold">Email:</span>
                                <p>{user.email || 'Cargando...'}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <span className="fw-bold">Dirección:</span>
                                <p>{user.address || 'No especificada'}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <span className="fw-bold">Teléfono:</span>
                                <p>{user.phone || 'No especificado'}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <span className="fw-bold">Ciudad:</span>
                                <p>{user.city || 'No especificada'}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <span className="fw-bold">País:</span>
                                <p>{user.country || 'No especificado'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sección de Bookings */}
            <div className="card mx-auto shadow mt-4" style={{ maxWidth: '900px', borderRadius: '16px' }}>
                <div className="card-body">
                    <h4 className="mb-3">Mis Reservas</h4>
                    {bookings.length === 0 ? (
                        <p className="text-muted">No tienes reservas.</p>
                    ) : (
                        <div>
                            {bookings.map(booking => (
                                <Booking key={booking.id} booking={booking} onDelete={handleDeleteBooking} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Sección de Habitaciones */}
            <div className="card mx-auto shadow mt-4" style={{ maxWidth: '900px', borderRadius: '16px' }}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="mb-0">Mis Habitaciones</h4>
                        <Link to="/addroom" className="btn btn-success">
                            + Agregar habitación
                        </Link>
                    </div>
                    {rooms.length === 0 ? (
                        <p className="text-muted">No tienes habitaciones publicadas.</p>
                    ) : (
                        <div className="row g-3">
                            {rooms.map(room => (
                                <div className="col-12 col-md-6" key={room.id}>
                                    <div className="card shadow-sm mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">{room.title}</h5>
                                            <p className="card-text mb-1"><strong>Dirección:</strong> {room.address}</p>
                                            <p className="card-text mb-1"><strong>Ciudad:</strong> {room.city}</p>
                                            <p className="card-text mb-1"><strong>Precio:</strong> ${room.price?.toLocaleString("es-CO") || room.price} COP</p>
                                            <p className="card-text mb-1"><strong>Capacidad:</strong> {room.capacity} personas</p>
                                            {room.bookings && room.bookings.length > 0 ? (
                                                <div className="mt-2">
                                                    <strong>Reservas:</strong>
                                                    <ul className="mb-0">
                                                        {room.bookings.map((b, i) => (
                                                            <li key={i}>
                                                                {b.check_in} &rarr; {b.check_out} ({b.guests} huéspedes)
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <button className="btn btn-secondary btn-sm mt-2" disabled>Eliminar habitación (tiene reservas)</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <p className="text-muted mb-0">Sin reservas</p>
                                                    <button className="btn btn-danger btn-sm mt-2" onClick={() => handleDeleteRoom(room.id)}>Eliminar habitación</button>
                                                    <button className="btn btn-warning btn-sm mt-2 ms-2" onClick={() => handleEditRoom(room)}>Editar</button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showEditProfile && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Perfil</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowEditProfile(false)}></button>
                            </div>
                            <div className="modal-body">
                                <EditProfile user={user} onClose={() => setShowEditProfile(false)} onProfileUpdated={() => { fetchUser(); setShowEditProfile(false); }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditRoom && roomToEdit && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Habitación</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowEditRoom(false)}></button>
                            </div>
                            <div className="modal-body">
                                <EditRoom room={roomToEdit} onClose={() => setShowEditRoom(false)} onRoomUpdated={handleRoomUpdated} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
