import { Link, NavLink } from "react-router-dom"
import EntranceSide from "./entranceSide"
import FormLogin from "./formLogin"


const LoginPage = () => {


    return <div className="auth-layout">
        <EntranceSide />
        <main className="auth-main">
            <div className="auth-card">
                <div className="auth-switch">
                    <NavLink to="/login">כניסה</NavLink>
                    <NavLink to="/register">הרשמה</NavLink>
                </div>
                <div className="auth-heading">
                    <h2>שמחים לראות אתכם שוב</h2>
                    <p>הכנסו עם הפרטים שהזנתם בעת ההרשמה</p>
                </div>
                <FormLogin />
            <p className="auth-footer">פעם ראשונה כאן? <Link to={"/register"}>להרשמה</Link></p>
            </div>
        </main>
    </div>
}

export default LoginPage