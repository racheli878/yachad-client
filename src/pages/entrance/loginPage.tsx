import { Link, NavLink } from "react-router-dom"
import EntranceSide from "./entranceSide"
import FormLogin from "./formLogin"


const LoginPage = () => {


    return <>
        {/* <h1 className="text-center mt-10">login</h1> */}
        <EntranceSide />
        <NavLink className="nav-link" to="login">כניסה</NavLink>
        <NavLink className="nav-link" to="register">הרשמה</NavLink>
        <h2>write here something...</h2>
        <FormLogin />
        <div>פעם ראשונה? <Link to={"/register"}>להרשמה</Link></div>
    </>
}

export default LoginPage