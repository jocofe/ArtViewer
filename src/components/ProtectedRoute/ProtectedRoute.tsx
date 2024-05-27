import { useContext } from "react"
import { UserContext } from "../../context/UserContextProvider"
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isLoggedIn } = useContext(UserContext);

    if (!isLoggedIn) {
        return <Navigate to='/signup'/>
    }

    return <Outlet />;
};