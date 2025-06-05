import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const Profile = () => {

    const [user, setUser] = useState({});
    const [error, setError] = useState(false);

    let { user_id } = useParams();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                    }
                });
                if (!res.ok) throw new Error("Error al obtener usuario");
                const data = await res.json();
                setUser(data);
            } catch (error) {
                setUser(null);
                console.error(error);
            }
        };
        fetchUser();
    }, [user_id]);

    return (
        <>
            {error ? <p>Usuario no encontrado</p> : <p>{user.name || "Cargando..."}</p>}
        </>
    )
}

export default Profile