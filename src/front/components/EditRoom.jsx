import React, { useState } from "react";

export default function EditRoom({ room, onClose, onRoomUpdated }) {
    const [form, setForm] = useState({
        title: room.title || "",
        description: room.description || "",
        rules: room.rules || "",
        capacity: room.capacity || "",
        price: room.price || "",
        address: room.address || "",
        city: room.city || ""
    });
    const [photoError, setPhotoError] = useState("");
    const [photos, setPhotos] = useState([]);
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
        const token = localStorage.getItem("jwt-token");
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => formData.append(key, value));
        if (photos.length > 0) {
            for (let i = 0; i < photos.length; i++) {
                formData.append("photos", photos[i]);
            }
        }
        const response = await fetch(`${API_BASE_URL}/room/${room.id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        const data = await response.json();
        if (response.ok) {
            alert("Habitación actualizada");
            onRoomUpdated();
        } else {
            alert(data.msg || "Error al actualizar habitación");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
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
                    <label htmlFor="photos" className="form-label">Imágenes (opcional)</label>
                    <input
                        type="file"
                        id="photos"
                        name="photos"
                        className="form-control"
                        multiple
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <small className="form-text text-muted">Puedes subir nuevas imágenes (mínimo 4 para reemplazar todas).</small>
                    {photoError && <div className="text-danger mt-1">{photoError}</div>}
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
            <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </div>
        </form>
    );
}
