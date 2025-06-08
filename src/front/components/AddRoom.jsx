import React, { useState, useContext } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRoom() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        rules: "",
        capacity: "",
        price: "",
        address: "",
        city: "",
        lat: "",
        lng: ""
    });
    const [photos, setPhotos] = useState([]);
    const [photoError, setPhotoError] = useState([]);

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const handleChange = (e) => {
        if (e.target.name === "photos") {
            setPhotos(e.target.files);
            if (e.target.files.length < 4) {
                setPhotoError("Debes subir al menos 4 imágenes de la habitación.");
            } else {
                setPhotoError("");
            }
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (photos.length < 4) {
            setPhotoError("Debes subir al menos 4 imágenes de la habitación.");
            return;
        }
        setPhotoError("");
        const host_id = localStorage.getItem("user_id");
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => formData.append(key, value));
        formData.append("host_id", host_id);
        for (let i = 0; i < photos.length; i++) {
            formData.append("photos", photos[i]);
        }
        const response = await fetch(`${API_BASE_URL}/room`, {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        if (response.ok) {
            alert("Habitación publicada");
            setForm({
                title: "",
                description: "",
                rules: "",
                capacity: "",
                price: "",
                address: "",
                city: "",
                lat: "",
                lng: ""
            });
            setPhotos([]);
            navigate("/room");
        } else {
            alert(data.msg || "Error al publicar habitación");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Título *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="Título"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="row mb-3">
                <div className="form-group col">
                    <label htmlFor="description" className="form-label">Descripción *</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="Descripción"
                        rows="3"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="photos" className="form-label">Imágenes *</label>
                    <input
                        type="file"
                        id="photos"
                        name="photos"
                        className="form-control"
                        multiple
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />
                    <small className="form-text text-muted">Sube al menos 4 imágenes. Medidas recomendadas: 800x600px o proporción 4:3.</small>
                    {photoError && <div className="text-danger mt-1">{photoError}</div>}
                    {photos && photos.length > 0 && (
                        <div className="mb-3 d-flex flex-wrap gap-2">
                            {[...photos].map((file, i) => (
                                <img key={i} src={URL.createObjectURL(file)} alt={`foto ${i}`} style={{ width: "160px", height: "120px", objectFit: "cover", borderRadius: "8px" }} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="row mb-3">
                <div className="form-group col-md-6">
                    <label htmlFor="address" className="form-label">Dirección *</label>
                    <textarea
                        id="address"
                        name="address"
                        className="form-control"
                        placeholder="Ingresar la dirección exacta"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="city" className="form-label">Ciudad *</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        placeholder="Ciudad"
                        value={form.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="lat" className="form-label">Lat *</label>
                    <input
                        type="float"
                        id="lat"
                        name="lat"
                        className="form-control"
                        placeholder="Lat"
                        value={form.lat}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="lng" className="form-label">Lng *</label>
                    <input
                        type="float"
                        id="lng"
                        name="lng"
                        className="form-control"
                        placeholder="Lng"
                        value={form.lng}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="form-group col">
                    <label htmlFor="rules" className="form-label">Reglas</label>
                    <textarea
                        id="rules"
                        name="rules"
                        className="form-control"
                        placeholder="Reglas de la habitación"
                        rows="2"
                        value={form.rules}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="capacity" className="form-label">Capacidad *</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        className="form-control"
                        placeholder="Capacidad de personas"
                        value={form.capacity}
                        onChange={handleChange}
                        required
                        step="1"
                        min="1"
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="price" className="form-label">Precio por noche *</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">$</div>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="price" name="price"
                            placeholder="Precio en CLP"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Publicar habitacion</button>
        </form>
    );
};
