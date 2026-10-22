import { Link, NavLink } from "react-router-dom"
import EntranceSide from "./entranceSide"
import FormRegister from "./formRegister"

const RegisterPage = () => {

    return <div className="auth-layout">
        <EntranceSide />
        <main className="auth-main">
            <div className="auth-card">
                <div className="auth-switch">
                    <NavLink to="/login">כניסה</NavLink>
                    <NavLink to="/register">הרשמה</NavLink>
                </div>
                <div className="auth-heading">
                    <h2>נעים להכיר</h2>
                    <p>שם וטלפון יוצגו למשתתפים במפגשים שלך. המייל נשאר פרטי.</p>
                </div>
                <FormRegister />
                <p className="auth-footer">כבר רשומים?  <Link to={"/login"}>להתחברות</Link></p>
            </div>
        </main>
    </div>
}

export default RegisterPage
