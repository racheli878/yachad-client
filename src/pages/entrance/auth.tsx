import type { ReactNode } from "react"
import EntranceSide from "./entranceSide"
import { Link, NavLink } from "react-router-dom"


const Auth=({title,subtitle,children,footerText,footerLinkText,footerLinkTo: footerLinkTo}:
    {title:string,subtitle:string,children:ReactNode,footerText:string,footerLinkText:string,footerLinkTo:string})=>{

    return  <div className="auth-layout">
        <EntranceSide />
        <main className="auth-main">
            <div className="auth-card">
                <div className="auth-switch">
                    <NavLink to="/login">כניסה</NavLink>
                    <NavLink to="/register">הרשמה</NavLink>
                </div>
                <div className="auth-heading">
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
                {children}
            <p className="auth-footer">{footerText} <Link to={footerLinkTo}>{footerLinkText}</Link></p>
            </div>
        </main>
    </div>


}

export default Auth