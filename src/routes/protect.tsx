import { Navigate, Outlet } from "react-router-dom";

const Protect = ({token}:{token:boolean}) => {
    

    //check token

    if (!token)
        return <Navigate to={"/login"} replace/>

    return <Outlet/>

}

export default Protect