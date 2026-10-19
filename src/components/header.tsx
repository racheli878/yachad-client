import { Link, Outlet } from "react-router-dom"

const Header=()=>{
    return<>
<div>
<Link to="login">כניסה</Link>
</div>
<div>
<Link to="register">הרשמה</Link>
</div>

<Outlet/>
    </>
}

export default Header