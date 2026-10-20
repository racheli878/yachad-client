import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CuserContext } from "../auth/cuserContext";
import Loading from "../components/loading";

const Protect = () => {

    const { loading, cuser } = useContext(CuserContext)

    if (loading)
        return <Loading/>
    if (cuser)
        return <Outlet />
    return <Navigate to={"/login"} replace />
}

export default Protect