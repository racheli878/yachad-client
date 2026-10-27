import { Link } from "react-router-dom"


const Error404=()=>{

    return<>
    <h1 className="not-found-code">404</h1>
    <h2 className="not-found-title">הדף לא נמצא</h2>
    <Link className="btn btn-primary not-found-link" to="/">חזרה לדף הבית</Link>
    </>
}
export default Error404