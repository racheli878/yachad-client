import { useContext } from "react"
import {  Link, NavLink, Outlet } from "react-router-dom"
import { CuserContext } from "../auth/cuserContext"
import { useQuery } from "@tanstack/react-query"
import { getMyInvitations } from "../api/invitationsApi"


const Header2 = () => {

    const { logOut, cuser } = useContext(CuserContext)
    
        const { data } = useQuery({
            queryKey: ["invitations"],
            queryFn: () => getMyInvitations()
        })

    return <>
        <header className="app-header">
            <div className="app-header-inner">
                <div className="header-start">
                    <Link className="logo" to="/allEvents">
                        <span className="logo-mark"></span>
                        <span className="logo-text">MeetUs</span>
                    </Link>

                    {/* <div >logo</div> */}
                    <NavLink className="nav-link" to="allEvents">לכל האירועים</NavLink>
                    <NavLink className="nav-link" to="invitations">ההזמנות שלי <span className="badge">{data?.count!=0&&data?.count}</span></NavLink>
                </div>
                <div className="header-end">
                    <div className="muted">שלום, {cuser?.fullName}</div>
                    <Link to="/addEvent" className="btn btn-primary">יצירת מפגש</Link>
                    <button className="btn btn-ghost btn-sm" onClick={logOut}>התנתקות</button>
                </div>

            </div>

        </header>

        <Outlet />
    </>
}

export default Header2