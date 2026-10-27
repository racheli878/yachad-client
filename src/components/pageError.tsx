import { Link } from "react-router-dom"
import getApiError from "../utils/getApiError"

const PageError = ({error}: {error:unknown}) => {
    return <div className="page-error">
        <div className="page-error-msg">{getApiError(error).message}</div>
        <Link className="btn btn-ghost" to="/allEvents">חזרה לכל האירועים</Link>
    </div>
}

export default PageError
