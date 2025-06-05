import { useContext, useEffect, useState } from 'react';
import { Context } from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';
import heroImage from '../assets/img/hero_section_beach.jpeg';
import SearchBar from '../components/SearchBar';
import RoomCard from '../components/RoomCard';

const Home = () => {
    const { store, actions } = useContext(Context);
    const [filteredRooms, setFilteredRooms] = useState(null);


    useEffect(() => {
        actions.getRooms();
    }, []);

    const handleSearch = ({ checkIn, checkOut, destination, guests }) => {
        const results = store.rooms.filter((room) => {
            const matchesDestination = room.destination.toLowerCase().includes(destination.toLowerCase());
            const matchesGuests = room.max_guests >= parseInt(guests);
            return matchesDestination && matchesGuests;
        });
        setFilteredRooms(results);
    };
    const roomsToShow = filteredRooms ?? store.rooms;

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
                <SearchBar onSearch={handleSearch} />
            </div>

            <div className="row mt-4 g-4">
                <div className="row mt-4">
                    {roomsToShow.length === 0 ? (
                        <p className="text-center">No se encontraron habitaciones.</p>
                    ) : (
                        roomsToShow.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))
                    )}
                </div>
            </div>

        </>
    );
}

export default Home;
