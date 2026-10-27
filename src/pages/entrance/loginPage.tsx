import FormLogin from "./formLogin"
import Auth from "./auth"


const LoginPage = () => {


    return <Auth title="שמחים לראות אתכם שוב" subtitle="הכנסו עם הפרטים שהזנתם בעת ההרשמה"
     footerText="פעם ראשונה כאן?" footerLinkText="להרשמה" tooterLinkTo="/register">
        <FormLogin/>
    </Auth>
}

export default LoginPage
