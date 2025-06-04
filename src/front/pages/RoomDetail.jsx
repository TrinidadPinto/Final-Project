import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import placeholderImg from "../assets/img/elementor-placeholder-image.webp";
import { useForm } from "react-hook-form";
import MapView from "../components/Mapview";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

export default function RoomDetail() {
    const { id } = useParams();
    const { actions } = useContext(Context);
    const [ room, setRoom ] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchRoom = async () => {
            const fetchedRoom = await actions.getRoomById(id);
            setRoom(fetchedRoom);
        };
        fetchRoom();
    }, [id]);

    const onSubmit = (data) => {
        console.log("Reserva:", data);
    };

    if (!room) return <div>Habitación no encontrada...</div>;

    return (
        <div className="container-fluid">
            <h2>{room.title}</h2>
            <div className="row">
                <div className="col-md-6">
                    <img src={placeholderImg} alt="" style={{width: "100%",}} />
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
                        <input className="rounded form-control" type="date" name="" id="" style={{ width: "100%" }} {...register("checkInDate", { required: true })} />
                        {errors.checkInDate && <small className="text-danger">La fecha de llegada es bligatoria.</small>}
                        <br />
                        <label className="form-label mb-1 small">Check-Out</label>
                        <input className="rounded form-control" type="date" name="" id="" style={{ width: "100%" }} {...register("checkOutDate", { required: true })} />
                        {errors.checkOutDate && <small className="text-danger">La fecha de salida es obligatoria.</small>}
                        <br />
                        <label className="form-label mb-1 small">Huéspedes</label>
                        <input type="number" className="form-control" placeholder="2" min="1" {...register("guests", { required: true })} />
                        {errors.guests && <small className="text-danger">La cantidad de huéspedes es obligatoria.</small> }
                        <button className="btn btn-primary w-100 mt-2" type="submit">Reservar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
