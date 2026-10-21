import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteEvent, getEvent } from "../../api/eventsApi"
import getApiError from "../../utils/getApiError"
import Loading from "../../components/loading"
import { formatDate } from "../../utils/formatDate"
import { activityTypeLabels, categoryLabels, EventStatusLabels } from "../../utils/labels"
import Roles from "../../components/roles"
import Participants from "../../components/participants"
import { useState } from "react"

const EventPage = () => {

    const { eventId } = useParams()
    const id = Number(eventId)
    const { data, isError,error,isPending:isDeleting } = useQuery({
        queryKey: ["event", id],
        queryFn: () => getEvent(id)
    })

    const clearEvent=()=>{
        if(confirm("למחוק את המפגש?"))
            mutate(id)
    }
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const {mutate,isPending}=useMutation({
        mutationFn:deleteEvent,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["events"]})
        navigate("/allEvents")
        },
    })

  if(isPending)
        return <Loading/>

    if(isError)
        return <div>
            <p>{getApiError(error).message}</p>
            <Link to="/allEvents">חזרה לכל האירועים</Link>
            </div>
  
    return <>
    <div>
    {/* the head part */}
    <div>
        <div>
            <span>{data?.event.status&&EventStatusLabels[data?.event.status]}</span>
            <span>{data?.event.category&&categoryLabels[data?.event.category]} · {data?.event.activityType&&activityTypeLabels[data?.event.activityType]}</span>
            {data?.event.myRole=="ORGANIZER"&&<span>באחריותי</span>}
        </div>
        <h1>{data?.event.title}</h1>
        <div>{data?.event.description}</div>
    </div>

    {data?.event.myRole=="ORGANIZER"&&<div>
        <Link to="edit">עריכת פרטים</Link>
        <button disabled={isDeleting} onClick={clearEvent}>{isPending?<>מוחק...<Loading/></>:"מחיקת מפגש"}</button>
    </div>}
    {/* details */}
    <div>
        <div><p>מתי</p><p>{data?.event.eventDate?formatDate(data?.event.eventDate):"עדיין לא נקבע תאריך"}</p></div>
        <div><p>איפה</p><p>{data?.event.location?data?.event.location:"עדיין לא נקבע מקום"}</p></div>
        <div><p>מה אוכלים</p><p>{data?.event.food?data?.event.food:"עדיין לא נקבע אוכל"}</p></div>
        <div><p>תקציב</p><p>{data?.event.budget!=null?data?.event.budget+"₪":"עדיין לא נקבע תקציב"}</p></div>
    </div>
    </div>
    <div>
        <Roles/>
        <Participants/>
    </div>
    </>
}

export default EventPage