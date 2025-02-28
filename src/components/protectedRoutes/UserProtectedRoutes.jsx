import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteUser({children}){
    const {user} = useContext(UserContext);

    // check if user is authenticated
    const isAuthenticated = user && user.userToken

    if(!isAuthenticated){
        // redirect to login if not authenticated
        return <Navigate to="/login" replace />
    }

    // allow access
    return children;
}