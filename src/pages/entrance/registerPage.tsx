import { Link, NavLink } from "react-router-dom"
import EntranceSide from "./entranceSide"
import FormRegister from "./formRegister"

const RegisterPage = () => {

    return <>
        {/* <div><h2 className="text-center mt-10">register here</h2></div> */}
        <EntranceSide />
        <NavLink className="nav-link" to="login">כניסה</NavLink>
        <NavLink className="nav-link" to="register">הרשמה</NavLink>
        <h2>נעים להכיר</h2>
        <div>שם וטלפון יוצגו למשתתפים במפגשים שלך. המייל נשאר פרטי.</div>
        <FormRegister />
        <div>כבר רשומים?  <Link to={"/login"}>להתחברות</Link></div>

    </>
}

export default RegisterPage