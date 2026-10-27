import { useParams } from "react-router-dom"
import Loading from "../../components/loading"
import EditDetails from "./editDetails"
import useEvent from "../../utils/useEvent"
import PageError from "../../components/pageError"

const EditEventPage = () => {
    const { eventId } = useParams()
    const id = Number(eventId)
    const { data, isError, error, isPending } = useEvent(id)

    if (isPending)
        return <Loading />

    if (isError)
        return <PageError error={error}/>

    return <>
        <div className="page-head edit-head">
            <h1>עריכת פרטי המפגש</h1>
            <p className="page-title-sub">רק המארגנים רואים את המסך הזה. השינויים יוצגו לכל המשתתפים</p>
        </div>
       
        <EditDetails event={data.event}/>
    </>
}

export default EditEventPage