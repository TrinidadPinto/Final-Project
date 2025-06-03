import { Link } from 'react-router-dom';
import heroImage from '../assets/img/hero_section_beach.jpeg';
import SearchBar from '../components/SearchBar';
import mockRooms from '../data/mockRooms';
import RoomCard from '../components/RoomCard';
import HotelCardList from '../components/HotelCardList';

const Home = () => {
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
                {
                    mockRooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))
                }
            </div>
        <HotelCardList />
        </>
    );
}
export default Home;

