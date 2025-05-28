import React, { useEffect, useState } from "react";
import "./HotelCardList.css";

const FAVORITES_KEY = "hotel_favorites";

export const HotelCardList = () => {
  const [hotels, setHotels] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Leer favoritos desde localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    setFavorites(savedFavorites);
  }, []);

  // Guardar favoritos en localStorage cada vez que cambien
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
      const url = "https://booking-com.p.rapidapi.com/v1/hotels/search";
      const params = new URLSearchParams({
        checkin_date: "2025-06-01",
        checkout_date: "2025-06-06",
        adults_number: "2",
        dest_id: "-592318", // Bogotá
        dest_type: "city",
        order_by: "popularity",
        locale: "es-co",
        currency: "COP"
      });

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "33d57a6f6amsh518672c245f0377p1f62cajsn6ecf128e6f9a", // ← Reemplaza con tu clave
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com"
        }
      };

      try {
        const res = await fetch(`${url}?${params}`, options);
        const data = await res.json();
        setHotels(data.result || []);
      } catch (err) {
        console.error("Error al cargar hoteles:", err);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="hotel-list">
      {hotels.map((hotel) => (
        <div className="hotel-card" key={hotel.hotel_id}>
          <img
            src={hotel.main_photo_url}
            alt={hotel.hotel_name}
            className="hotel-image"
          />
          <div className="hotel-info">
            <h3>{hotel.hotel_name}</h3>
            <p>{hotel.city}, {hotel.country_trans}</p>
            <p><strong>{hotel.min_total_price} COP</strong> / 5 noches</p>
            <p>⭐ {hotel.review_score || "Sin calificación"}</p>
            <button
              className={`fav-btn ${favorites.includes(hotel.hotel_id) ? "fav" : ""}`}
              onClick={() => toggleFavorite(hotel.hotel_id)}
              aria-label="Marcar como favorito"
            >
              {favorites.includes(hotel.hotel_id) ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


