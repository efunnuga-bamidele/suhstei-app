import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

export const ProtectedLayout  = ({ children }) =>{
    const currentUser = useSelector(selectCurrentUser);


    return currentUser ? <Navigate to='/' /> : children




}