import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import RoomCard from "../components/RoomCard";
import Booking from "../components/Booking";

const Profile = () => {

    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [bookings, setBookings] = useState([]);

    let { user_id } = useParams();
    useEffect(() => {
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
        fetchUser();
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

    return (
        <div className="container mt-5">
            <div className="card mx-auto shadow" style={{ maxWidth: '900px', borderRadius: '16px' }}>
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h2 className="mb-0">Perfil de Usuario</h2>
                        <button className="btn btn-primary" onClick={() => {/* acción futura de editar */ }}>
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
                    <p className="text-muted">Aquí podrás ver las habitaciones que has publicado (próximamente).</p>
                    {/* Aquí se mostrarán las habitaciones del usuario */}
                </div>
            </div>
        </div>
    )
}

export default Profile