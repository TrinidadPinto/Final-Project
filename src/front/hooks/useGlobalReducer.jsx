import React, { useState, useEffect } from "react";
import getState from "../store";

export const Context = React.createContext(null);

export const StoreProvider = ({ children }) => {
    const [state, setState] = useState(
        getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: updatedStore => setState({
                store: { ...state.store, ...updatedStore },
                actions: { ...state.actions }
            })
        })
    );

    useEffect(() => {
        // Llama a fetchRooms al cargar la app
        state.actions.fetchRooms();
    }, []);

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
};
