import { useQuery } from "@tanstack/react-query"
import { getEvent } from "../../api/eventsApi"
import Participants from "./participants"
import Tasks from "./tasks"
import { Link, useParams } from "react-router-dom"
import getApiError from "../../utils/getApiError"
import Loading from "../../components/loading"

const EventHome=()=>{

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

return<>
 <div className="container page event-body">
            <Tasks tasks={data.tasks} />
            <Participants participants={data.participants} />
        </div>
</>
}

export default EventHome