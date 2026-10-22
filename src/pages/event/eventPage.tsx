import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteEvent, getEvent, leavingEvent } from "../../api/eventsApi"
import getApiError from "../../utils/getApiError"
import Loading from "../../components/loading"
import { formatDate } from "../../utils/formatDate"
import { activityTypeLabels, categoryLabels, EventStatusLabels } from "../../utils/labels"
import Tasks from "./tasks"
import Participants from "./participants"
import { useState } from "react"

const EventPage = () => {

    const { eventId } = useParams()
    const id = Number(eventId)
    const { data, isError,error,isPending } = useQuery({
        queryKey: ["event", id],
        queryFn: () => getEvent(id)
    })

    const clearEvent=()=>{
        if(confirm("למחוק את המפגש?"))
            mutate(id)
    }
    const leaveEvent=()=>{
        if(confirm("בטוח שברצונכם לעזוב את המפגש?"))
            leaveMutate(id)
    }
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const [errorMessage,setErrorMessage]=useState("")
    const {mutate,isPending:isDeleting}=useMutation({
        mutationFn:deleteEvent,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["events"]})
        navigate("/allEvents")
        },
        onError:(e)=>setErrorMessage(getApiError(e).message)
    })
    const {mutate:leaveMutate,isPending:isLeaving}=useMutation({
        mutationFn:leavingEvent,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["events"]})
        navigate("/allEvents")
        },
        onError:(e)=>setErrorMessage(getApiError(e).message)
    })

  if(isPending)
        return <Loading/>

    if(isError)
        return <div>
            <p>{getApiError(error).message}</p>
            <Link to="/allEvents">חזרה לכל האירועים</Link>
            </div>
  
    return <>
    <div className="event-hero">
    {/* the head part */}
    <div className="event-hero-head">
        <div className="event-hero-tags">
            <span className="tag tag-solid">{data?.event.status&&EventStatusLabels[data?.event.status]}</span>
            <span className="tag">{data?.event.category&&categoryLabels[data?.event.category]} · {data?.event.activityType&&activityTypeLabels[data?.event.activityType]}</span>
            {data?.event.myRole=="ORGANIZER"&&<span className="tag">באחריותי</span>}
        </div>
        <h1>{data?.event.title}</h1>
        <div className="event-hero-desc">{data?.event.description}</div>
    </div>

    {data?.event.myRole=="ORGANIZER"?<div className="event-hero-actions">
        <Link className="btn btn-light" to="edit">עריכת פרטים</Link>
        <button className="btn btn-outline-light" disabled={isDeleting} onClick={clearEvent}>{isDeleting?<>מוחק...<Loading/></>:"מחיקת מפגש"}</button>
        {errorMessage!=""&&<div className="alert alert-error">{errorMessage}</div>}
    </div>:<button disabled={isLeaving} onClick={leaveEvent}>{isLeaving?<div>עוזב... <Loading/></div>: <div>עזיבת המפגש</div>}</button>}
    {/* details */}
    <div className="info-tiles">
        <div className="info-tile"><p className="info-tile-label">מתי</p><p className="info-tile-value">{data?.event.eventDate?formatDate(data?.event.eventDate):"עדיין לא נקבע תאריך"}</p></div>
        <div className="info-tile"><p className="info-tile-label">איפה</p><p className="info-tile-value">{data?.event.location?data?.event.location:"עדיין לא נקבע מקום"}</p></div>
        <div className="info-tile"><p className="info-tile-label">מה אוכלים</p><p className="info-tile-value">{data?.event.food?data?.event.food:"עדיין לא נקבע אוכל"}</p></div>
        <div className="info-tile"><p className="info-tile-label">תקציב</p><p className="info-tile-value">{data?.event.budget!=null?data?.event.budget+" ₪ ":"עדיין לא נקבע תקציב"}</p></div>
    </div>
    </div>
    <div className="container page event-body">
        <Tasks tasks={data.tasks}/>
        <Participants participants={data.participants}/>
    </div>
    </>
}

export default EventPage