import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { CuserContext } from "../auth/cuserContext"
import Loading from "../components/loading"



const GuestOnly = () => {

    const { loading, cuser } = useContext(CuserContext)

    if (loading)
        return <Loading/>
    if (cuser != null)
        return <Navigate to={"/home"} replace />
    return <Outlet />
}
export default GuestOnly