import { Navigate, Outlet } from "react-router-dom"

const GuestOnly = ({ isLoggedIn }: { isLoggedIn: boolean }) => {

    if (isLoggedIn)
        return <Navigate to={"/allEvents"} replace />
    return <Outlet/>
        
}
export default GuestOnly