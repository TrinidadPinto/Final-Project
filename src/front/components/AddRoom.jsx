import React, { useState, useContext } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRoom() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        photos: "",
        rules: "",
        capacity: "",
        price: ""
    });

    const API_BASE_URL = "https://sturdy-zebra-qrrwg6q6q942659j-3001.app.github.dev/api";

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const host_id = localStorage.getItem("user_id");
        const response = await fetch(`${API_BASE_URL}/room`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                photos: form.photos.split(",").map(p => p.trim()),
                host_id: parseInt(host_id)
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Habitación publicada");
            useActionState.fetchRooms();
            setForm({
                title: "",
                description: "",
                photos: "",
                rules: "",
                capacity: "",
                price: ""
            });
            navigate("/room");
        } else {
            alert(data.msg || "Error al publicar habitación");
        }
    };
    const photoUrls = form.photos.split(",").map(p => p.trim()).filter(Boolean);

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Titulo *</label>
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

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripcion *</label>
                <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Descripcion"
                    rows="3"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="photos" className="form-label">Imagenes *</label>
                <input
                    type="text"
                    id="photos"
                    name="photos"
                    className="form-control"
                    placeholder="URLs de fotos separadas por coma"
                    value={form.photos}
                    onChange={handleChange}
                    required
                />
            </div>
            {photoUrls.length > 0 && (
                <div className="mb-3 d-flex flex-wrap gap-2">
                    {photoUrls.map((url,i) => (
                        <img key={i} src={url} alt={`foto ${i}`} style={{width:"100px", height:"100px", objectFit:"cover" }} />
                    ))}
                </div>
            )}
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
                        placeholder="Cantidad de personas"
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
