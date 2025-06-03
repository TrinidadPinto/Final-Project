import React, { useEffect, useState } from "react";
import "../components/HotelCardList.css";

const FAVORITES_KEY = "hotel_favorites";

const HotelCardList = () => {
  const [hotels, setHotels] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  // Cargar favoritos de localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    setFavorites(savedFavorites);
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchHotels = async () => {
      const url = "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination";
      const params = new URLSearchParams({
        query: "man",
      });

      const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
      if (!apiKey) {
        setError("⚠️ Falta la clave API (VITE_RAPIDAPI_KEY)");
        return;
      }

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
        },
      };

      try {
        const res = await fetch(`${url}?${params}`, options);

        if (res.status === 429) {
          throw new Error("Demasiadas solicitudes. Intenta más tarde.");
        }

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }

        const data = await res.json();
        console.log("Datos hoteles API:", data);
        setHotels(data.data || []);
      } catch (err) {
        console.error("Error al cargar hoteles:", err);
        setError(err.message);
      }
    };

    // Llama a la API con retardo para evitar 429
    const timeout = setTimeout(fetchHotels, 1500);

    return () => clearTimeout(timeout);
  }, []);

  if (error) {
    return <div className="error-message">⚠️ {error}</div>;
  }

  return (
    <div className="hotel-list">
      {hotels.length === 0 ? (
        <p>No se encontraron hoteles disponibles.</p>
      ) : (
        hotels.map((hotel) => {
          const hotelId = hotel.dest_id;
          const isFavorite = favorites.includes(hotelId);
          const name = hotel.name || hotel.label || "Nombre no disponible";
          const city = hotel.city_name || hotel.label || "Ciudad no disponible";
          const country = hotel.country || "País no disponible";
          const image = hotel.image_url || "";
          const price = hotel.min_total_price || hotel.price || "Precio no disponible";
          const rating = hotel.review_score || hotel.rating || "Sin calificación";

          return (
            <div className="hotel-card" key={hotelId}>
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="hotel-image"
                  loading="lazy"
                />
              ) : (
                <div className="no-image">No hay imagen disponible</div>
              )}
              <div className="hotel-info">
                <h3>{name}</h3>
                <p>
                  {city}, {country}
                </p>
                <p>
                  <strong>{price} COP</strong>
                </p>
                <p>⭐ {rating}</p>
                <button
                  className={`fav-btn ${isFavorite ? "fav" : ""}`}
                  onClick={() => toggleFavorite(hotelId)}
                  aria-label={isFavorite ? "Quitar de favoritos" : "Marcar como favorito"}
                >
                  {isFavorite ? (
                    <i className="fa-solid fa-heart"></i>
                  ) : (
                    <i className="fa-regular fa-heart"></i>
                  )}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default HotelCardList;
