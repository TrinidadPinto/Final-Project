import { useContext, useEffect } from 'react';
import { Context } from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';
import heroImage from '../assets/img/hero_section_beach.jpeg';
import SearchBar from '../components/SearchBar';
import RoomCard from '../components/RoomCard';

const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.rooms.length === 0) {
            actions.getRooms();  
        }
    }, []);

    return (
        <>
            <div
                className="hero-section position-relative d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '320px',
                    borderRadius: '16px',
                }}
            >
                <h2 className="text-white fw-semibold display-6 text-shadow">Encuentra tu próxima aventura</h2>
            </div>
            <div className="bg-white p-4 rounded shadow position-relative z-1 mx-auto" style={{ maxWidth: '900px', marginTop: '-40px' }}>
                <SearchBar />
            </div>
            <div className="row mt-4">
                {store.rooms.length === 0 ? (
                    <p className="text-center">Cargando habitaciones...</p>
                ) : (
                    store.rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))
                )}
            </div>

        </>
    );
}
export default Home;
