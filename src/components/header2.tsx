import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { CuserContext } from "../auth/cuserContext"

const Header2=()=>{

    const {logOut, cuser}= useContext(CuserContext)

    return<>
    
    <Link to="allEvents">לכל האירועים</Link>
    <Link to="invitations">ההזמנות שלי</Link>
    <Link to="addEvent">הוספת אירוע</Link>

    <button onClick={logOut}>התנתקות</button>
    <div>שלום, {cuser?.fullName}</div>
    
    <Outlet/>
    </>
}

export default Header2