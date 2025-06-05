import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import placeholderImg from "../assets/img/elementor-placeholder-image.webp";
import { useForm } from "react-hook-form";
import MapView from "../components/Mapview";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RoomDetail() {
    const { id } = useParams();
    const { actions } = useContext(Context);
    const [room, setRoom] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [dateError, setDateError] = useState("");
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm();

    useEffect(() => {
        const fetchRoom = async () => {
            const fetchedRoom = await actions.getRoomById(id);
            setRoom(fetchedRoom);
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

    if (!room) return <div>Habitación no encontrada...</div>;

    return (
        <div className="container-fluid">
            <h2>{room.title}</h2>
            <div className="row">
                <div className="col-md-6">
                    <img src={placeholderImg} alt="" style={{ width: "100%", }} />
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <img src={placeholderImg} alt="" className="col-md-6" />
                        <img src={placeholderImg} alt="" className="col-md-6" />
                    </div>
                    <div className="row mt-3">
                        <img src={placeholderImg} alt="" className="col-md-6" />
                        <img src={placeholderImg} alt="" className="col-md-6" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <p>{room.description}</p>
                    {room.lat && room.lng ? (
                        <MapView lat={room.lat} lng={room.lng} address={room.address} />
                    ) : (
                        <p><em>Ubicación no disponible.</em></p>
                    )}
                </div>
                <div className="col-md-3 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="shadow p-3 mb-5 bg-body-tertiary rounded" >
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
