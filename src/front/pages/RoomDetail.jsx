import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import placeHolderImg from "../assets/img/elementor-placeholder-image.webp";
import { useForm } from "react-hook-form";
import MapView from "../components/Mapview";
import { rules } from "eslint-plugin-react-refresh";
import mockRooms from '../data/mockRooms';

export default function RoomDetail() {
    const location = useLocation();
    const { id } = useParams();
    const room = mockRooms.find(r => r.id === parseInt(id, 10));

    if (!room) {
        return <div>No room data available.</div>;
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Datos del formulario:", data);
        // Aquí podrías enviar los datos a una API, filtrar resultados, etc.
    };

    return (
        <>
            <div className="container-fluid">
                <h2>Title</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={placeHolderImg}
                            alt=""
                            style={{
                                width: "100%",
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <img src={placeHolderImg} alt="" className="col-md-6" />
                            <img src={placeHolderImg} alt="" className="col-md-6" />
                        </div>
                        <div className="row mt-3">
                            <img src={placeHolderImg} alt="" className="col-md-6" />
                            <img src={placeHolderImg} alt="" className="col-md-6" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        {/* Body de la Room*/}
                        <div className="row mt-2 ">
                            <h3 className="h3">{room.title}</h3>
                            <p className="p">{room.description}</p>
                        </div>
                        <div className="row mt-2 ">
                            <h3 className="h3">Location</h3>
                            <MapView lat={room.lat} lng={room.lng} address={room.address} />
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        {/* Modal o seccion para reservar */}
                        <div className="row mt-2">
                            <div className="col-md-12 ">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="shadow p-3 mb-5 bg-body-tertiary rounded"
                                >
                                    <label className="form-label mb-1 small">Check-in</label>
                                    <input
                                        className="rounded form-control"
                                        type="date"
                                        name=""
                                        id=""
                                        style={{ width: "100%" }}
                                        {...register("checkInDate", { required: true })}
                                    />
                                    {errors.checkInDate && (
                                        <small className="text-danger">Check-in is required</small>
                                    )}
                                    <br />
                                    <label className="form-label mb-1 small">Check-Out</label>
                                    <input
                                        className="rounded form-control"
                                        type="date"
                                        name=""
                                        id=""
                                        style={{ width: "100%" }}
                                        {...register("checkOutDate", { required: true })}
                                    />
                                    {errors.checkOutDate && (
                                        <small className="text-danger">Check-Out is required</small>
                                    )}
                                    <br />
                                    <label className="form-label mb-1 small">Guest number</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="2"
                                        min="1"
                                        {...register("guests", { required: true })}
                                    />
                                    {errors.guests && (
                                        <small className="text-danger">
                                            Guests number is required
                                        </small>
                                    )}
                                    <button className="btn btn-primary w-100 mt-2" type="submit">
                                        Book
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
