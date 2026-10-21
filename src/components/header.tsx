import {  Outlet } from "react-router-dom"

const Header=()=>{
    return<>
<div className="inline-flex">
{/* <Link className="nav-link" to="login">כניסה</Link> */}
</div>
<div className="inline-flex">
{/* <Link className="nav-link" to="register">הרשמה</Link> */}
</div>

<Outlet/>
    </>
}

export default Header