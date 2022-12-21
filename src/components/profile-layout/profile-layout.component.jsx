import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../book/user/user.selector";

export const ProfileLayout = ({ children }) => {
    const currentUser = useSelector(selectCurrentUser); 

    return currentUser ? children : <Navigate to='/signup' />
}


