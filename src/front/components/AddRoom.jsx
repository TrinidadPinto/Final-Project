import React, { useState } from "react";

export default function AddRoom() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        photos: "",
        rules: "",
        capacity: "",
        price: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const host_id = localStorage.getItem("user_id");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                photos: form.photos.split(","),
                host_id: parseInt(host_id)
            })
        });
        const data = await response.json();
        if (response.ok) {
            alert("Habitación publicada");
            setForm({
                title: "",
                description: "",
                photos: "",
                rules: "",
                capacity: "",
                price: ""
            });
        } else {
            alert(data.msg || "Error al publicar habitación");
        }
    };

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
                <label htmlFor="photos" className="form-label">URLs de fotos (separadas por coma) *</label>
                <input
                    type="text"
                    id="photos"
                    name="photos"
                    className="form-control"
                    placeholder="https://link1.com, https://link2.com"
                    value={form.photos}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
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

            <div className="mb-3">
                <label htmlFor="capacity" className="form-label">Capacidad *</label>
                <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    className="form-control"
                    placeholder="Número de personas"
                    value={form.capacity}
                    onChange={handleChange}
                    required
                    min="1"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Precio por noche *</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                    placeholder="Precio en CLP"
                    value={form.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                />
            </div>

            <button type="submit" className="btn btn-primary w-100">Publicar habitacion</button>
        </form>
    );
};
