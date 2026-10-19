import { Link, Outlet } from "react-router-dom"

const Header2=()=>{

    return<>
    
    <Link to="allEvents">לכל האירועים</Link>
    <Link to="invitations">ההזמנות שלי</Link>
    <Link to="addEvent">הוספת אירוע</Link>

    <Outlet/>
    </>
}

export default Header2