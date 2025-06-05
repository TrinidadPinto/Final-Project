const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            rooms: [],
        },
        actions: {
            fetchRooms: async () => {
                try {
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/room`);
                    if (!res.ok) throw new Error("Error al obtener habitaciones");
                    const data = await res.json();
                    setStore({ rooms: data });
                } catch (error) {
                    console.error("Error al obtener habitaciones:", error);
                }
            },
            getRoomById: async (id) => {
                const store = getStore();
                const roomId = parseInt(id);
                let room = store.rooms.find(room => room.id === roomId);
                if (!room) {
                    try {
                        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/room/${roomId}`);
                        if (!resp.ok) throw new Error("Error al mostrar habitación");
                        room = await resp.json();
                        setStore({ rooms: [...store.rooms, room] });
                    } catch (error) {
                        console.error("Error cargando habitación desde la API:", error);
                        return null;
                    }
                }
                return room;
            },

            getRooms: async () => {
              try {
                const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/room`);
                if (!resp.ok) throw new Error("Error al obtener las habitaciones");
                const data = await resp.json();
                setStore({ rooms: data });
                console.log(data)
              } catch (error) {
                console.error("Error cargando habitaciones:", error);
              }
            },

        }
    };
};

export default getState;