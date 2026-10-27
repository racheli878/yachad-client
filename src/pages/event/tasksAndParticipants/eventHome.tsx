import Participants from "./participants"
import Tasks from "./tasks"
import { useParams } from "react-router-dom"
import Loading from "../../../components/loading"
import useEvent from "../../../utils/useEvent"
import PageError from "../../../components/pageError"

const EventHome=()=>{

        const { eventId } = useParams()
    const id = Number(eventId)
    const { data, isError, error, isPending } = useEvent(id)
       if (isPending)
        return <Loading />

    if (isError)
        return <PageError error={error}/>

return<>
 <div className="container page event-body">
            <Tasks id={id} />
            <Participants participants={data.participants} organizer={false} />
        </div>
</>
}

export default EventHome