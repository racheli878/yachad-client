import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { getEvent } from "../../api/eventsApi"
import Loading from "../../components/loading"
import getApiError from "../../utils/getApiError"
import EditDetails from "./editDetails"

const EditEventPage = () => {
    const { eventId } = useParams()
    const id = Number(eventId)
    const { data, isError, error, isPending } = useQuery({
        queryKey: ["event", id],
        queryFn: () => getEvent(id)
    })

    if (isPending)
        return <Loading />

    if (isError)
        return <div>
            <p>{getApiError(error).message}</p>
            <Link to="/allEvents">חזרה לכל האירועים</Link>
        </div>

    return <>
        <div className="page-head edit-head">
            <h1>עריכת פרטי המפגש</h1>
            <p className="page-title-sub">רק המארגנים רואים את המסך הזה. השינויים יוצגו לכל המשתתפים</p>
        </div>
       
        <EditDetails event={data.event}/>
    </>
}

export default EditEventPage