import Auth from "./auth"
import FormRegister from "./formRegister"

const RegisterPage = () => {

    return <Auth title="נעים להכיר" subtitle="שם וטלפון יוצגו למשתתפים במפגשים שלך. המייל נשאר פרטי" 
    footerText="כבר רשומים?" footerLinkText="להתחברות" footerLinkTo="/login">
        <FormRegister/>
    </Auth>
}

export default RegisterPage
