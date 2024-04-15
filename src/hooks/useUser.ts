import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe ser utilizado dentro de un UserProvider');
    }
    return context;
};