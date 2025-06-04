const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            rooms: [],
        },
        actions: {
            fetchRooms: async () => {
                try {
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/room`);
                    if (!res.ok) throw new Error("Error al obtener habitaciones");
                    const data = await res.json();
                    setStore({ rooms: data });
                } catch (error) {
                    console.error("Error al obtener habitaciones:", error);
                }
            },
            getRoomById: (id) => {
                const store = getStore();
                return store.rooms.find(room => room.id === parseInt(id));
            },
            getRooms: async () => {
              try {
                const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/room`);
                if (!resp.ok) throw new Error("Error al obtener las habitaciones");
                const data = await resp.json();
                setStore({ rooms: data });
              } catch (error) {
                console.error("Error cargando habitaciones:", error);
              }
            },

        }
    };
};

export default getState;
