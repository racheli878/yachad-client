import type { ReactNode } from "react"
import { Navigate, Outlet } from "react-router-dom";

const Protect = ({token}:{token:boolean}) => {
    
    token=true;
    //check token

    if (!token)
        return <Navigate to={"/login"} replace/>

    return <Outlet/>

}

export default Protect