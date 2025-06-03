import React, { useState } from "react";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const API_BASE_URL = "https://sturdy-zebra-qrrwg6q6q942659j-3001.app.github.dev/api";

  const validarEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    if (!validarEmail(email)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    console.log(import.meta.env.VITE_BACKEND_URL)

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Usuario registrado con éxito!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setError(data.message || "Error al registrarse.");
      }
    } catch (error) {
      setError("Error en la conexión con el servidor.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Registro</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Tu nombre"
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
