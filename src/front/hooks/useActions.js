// src/js/hooks/useActions.js
import { useContext } from "react";
import { Context } from "./useGlobalReducer";

export const useActions = () => {
  const { dispatch } = useContext(Context);

  const getMessage = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

      const response = await fetch(backendUrl + "/api/hello");
      const data = await response.json();

      if (response.ok) dispatch({ type: "set_hello", payload: data.message });
    } catch (error) {
      console.error("Error al traer el mensaje:", error.message);
    }
  };

  return { getMessage };
};
