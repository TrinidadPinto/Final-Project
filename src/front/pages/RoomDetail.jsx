import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
import placeholderImg from "../assets/img/elementor-placeholder-image.webp";
import { useForm } from "react-hook-form";
import MapView from "../components/Mapview";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RoomDetail() {
    const { id } = useParams();
    const { actions } = useContext(Context);
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookedDates, setBookedDates] = useState([]);
    const [dateError, setDateError] = useState("");
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm();

    useEffect(() => {
        const fetchRoom = async () => {
            setLoading(true);
            const fetchedRoom = await actions.getRoomById(id);
            setRoom(fetchedRoom);
            setLoading(false);
        };
        fetchRoom();
    }, [id]);

    useEffect(() => {
        // Fetch booked dates for this room
        const fetchBookedDates = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/room/${id}/booked-dates`);
                const data = await res.json();
                if (res.ok && data.booked_dates) {
                    setBookedDates(data.booked_dates);
                }
            } catch (error) {
                setBookedDates([]);
            }
        };
        fetchBookedDates();
    }, [id]);

    // Función para validar si la fecha está ocupada
    const isDateBooked = (date) => bookedDates.includes(date);

    // Validar fechas seleccionadas
    const checkInDate = watch("checkInDate");
    const checkOutDate = watch("checkOutDate");

    // Convertir las fechas ocupadas a objetos Date
    const excludedDates = bookedDates.map(date => new Date(date));

    useEffect(() => {
        setDateError("");
        if (checkIn && isDateBooked(checkIn.toISOString().slice(0, 10))) {
            setDateError("La fecha de check-in está ocupada.");
            setCheckIn(null);
        } else if (checkOut && isDateBooked(checkOut.toISOString().slice(0, 10))) {
            setDateError("La fecha de check-out está ocupada.");
            setCheckOut(null);
        } else if (checkIn && checkOut) {
            let current = new Date(checkIn);
            const end = new Date(checkOut);
            let found = false;
            while (current <= end) {
                const d = current.toISOString().slice(0, 10);
                if (isDateBooked(d)) {
                    setDateError("El rango seleccionado incluye fechas ocupadas.");
                    found = true;
                    break;
                }
                current.setDate(current.getDate() + 1);
            }
            if (!found) setDateError("");
        }
    }, [checkIn, checkOut, bookedDates]);

    const onSubmit = async (data) => {
        if (dateError) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
                },
                body: JSON.stringify({
                    room_id: id,
                    check_in: checkIn ? checkIn.toISOString().slice(0, 10) : null,
                    check_out: checkOut ? checkOut.toISOString().slice(0, 10) : null,
                    guests: data.guests
                })
            });
            const result = await res.json();
            if (res.ok) {
                alert('Reserva realizada con éxito');
            } else {
                alert(result.msg || 'Error al realizar la reserva');
            }
        } catch (error) {
            alert('Error de conexión al reservar');
            console.error(error);
        }
    };

    if (loading) return <div className="text-center py-5"><span className="spinner-border spinner-border-sm me-2"></span>Cargando habitación...</div>;
    if (!room) return <div className="text-center py-5 text-danger">Habitación no encontrada...</div>;

    // Asegura que siempre haya 5 imágenes (rellena con placeholder si faltan)
    let imagesArr = room.photo_url && Array.isArray(room.photo_url) && room.photo_url[0].startsWith('http')
        ? room.photo_url.slice(0, 5)
        : [];
    while (imagesArr.length < 5) imagesArr.push(placeholderImg);

    return (
        <div className="container-fluid">
            <h2>{room.title}</h2>
            <div className="row">
                <div className="col-md-7 d-flex align-items-stretch mb-3 mb-md-0">
                    <img src={imagesArr[0]} alt={room.title} style={{ width: "100%", height: "380px", objectFit: "cover", borderRadius: "12px" }} />
                </div>
                <div className="col-md-5">
                    <div className="row g-2">
                        {[1, 2, 3, 4].map(i => (
                            <div className="col-6" key={i}>
                                <img src={imagesArr[i]} alt={room.title} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-8">
                    <p className="fs-5 mb-3">{room.description}</p>
                    <div className="d-flex flex-wrap gap-4 align-items-center py-3 px-2 mb-3" style={{ background: '#f8f9fa', borderRadius: '10px', border: '1px solid #e0e3e8', fontSize: '1.08rem', fontWeight: 500 }}>
                        <span className="d-flex align-items-center"><i className="bi bi-people-fill me-2 text-primary" title="Capacidad máxima"></i> {room.capacity} huésped{room.capacity > 1 ? 'es' : ''}</span>
                        <span className="d-flex align-items-center"><i className="bi bi-cash-coin me-2 text-success" title="Precio por noche"></i> ${room.price?.toLocaleString("es-CO") || room.price} COP</span>
                        <span className="d-flex align-items-center"><i className="bi bi-geo-alt-fill me-2 text-danger" title="Dirección"></i> {room.address}</span>
                        <span className="d-flex align-items-center"><i className="bi bi-buildings me-2 text-secondary" title="Ciudad"></i> {room.city}</span>
                    </div>
                    {room.lat && room.lng ? (
                        <MapView lat={room.lat} lng={room.lng} address={room.address} />
                    ) : (
                        <p><em>Ubicación no disponible.</em></p>
                    )}
                    <div className="mt-4 p-3" style={{ background: '#f4f6fa', borderRadius: '10px', border: '1px solid #e0e3e8' }}>
                        <h6 className="mb-2 text-primary d-flex align-items-center" style={{ fontWeight: 600 }}>
                            <i className="bi bi-list-check me-2" style={{ fontSize: '1.2rem' }}></i>
                            Reglas de la casa
                        </h6>
                        <div style={{ whiteSpace: 'pre-line', color: '#495057', fontSize: '1rem', lineHeight: 1.6 }}>
                            {room.rules && room.rules.trim() !== '' ? room.rules : <span className="text-muted">Sin reglas específicas</span>}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="shadow p-3 mb-5 bg-body-tertiary rounded">
                        <label className="form-label mb-1 small">Check-in</label>
                        <DatePicker
                            selected={checkIn}
                            onChange={date => setCheckIn(date)}
                            excludeDates={excludedDates}
                            minDate={new Date()}
                            dateFormat="yyyy-MM-dd"
                            className="rounded form-control"
                            placeholderText="Selecciona fecha de llegada"
                        />
                        <br />
                        <label className="form-label mb-1 small">Check-Out</label>
                        <DatePicker
                            selected={checkOut}
                            onChange={date => setCheckOut(date)}
                            excludeDates={excludedDates}
                            minDate={checkIn || new Date()}
                            dateFormat="yyyy-MM-dd"
                            className="rounded form-control"
                            placeholderText="Selecciona fecha de salida"
                        />
                        <br />
                        <label className="form-label mb-1 small">Huéspedes</label>
                        <input type="number" className="form-control" placeholder="2" min="1" {...register("guests", { required: true })} />
                        {errors.guests && <small className="text-danger">La cantidad de huéspedes es obligatoria.</small>}
                        {dateError && <div className="text-danger mt-2">{dateError}</div>}
                        <button className="btn btn-primary w-100 mt-2" type="submit" disabled={!!dateError}>Reservar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
