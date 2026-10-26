import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
import { deleteEvent, getEvent, leavingEvent } from "../../api/eventsApi"
import getApiError from "../../utils/getApiError"
import Loading from "../../components/loading"
import { formatDate } from "../../utils/formatDate"
import { activityTypeLabels, categoryLabels, EventStatusLabels } from "../../utils/labels"

const EventPage = () => {

    const { eventId } = useParams()
    const id = Number(eventId)
    const { data, isPending , isError, error} = useQuery({
        queryKey: ["event", id],
        queryFn: () => getEvent(id)
    })

    const clearEvent = () => {
        if (confirm("למחוק את המפגש?"))
            mutate(id)
    }
    const leaveEvent = () => {
        if (confirm("בטוח שברצונכם לעזוב את המפגש?"))
            leaveMutate(id)
    }
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate,isError:cannotDel,error:notDel , isPending: isDeleting} = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
            navigate("/allEvents")
        },
    })
    const { mutate: leaveMutate, isPending: isLeaving,isError:connotLeave,error:dontLeave } = useMutation({
        mutationFn: leavingEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
            navigate("/allEvents")
        },
    })

    if (isPending)
        return <Loading />

    if (isError)
        return <div className="page-error">
            <p className="page-error-msg">{getApiError(error).message}</p>
            <Link className="btn btn-ghost" to="/allEvents">חזרה לכל האירועים</Link>
        </div>

    return <>
        <div className="event-hero">
            {/* the head part */}
            <div className="event-hero-head">
                <div className="event-hero-tags">
                    <span className="tag tag-solid">{data?.event.status && EventStatusLabels[data?.event.status]}</span>
                    <span className="tag">{data?.event.category && categoryLabels[data?.event.category]} · {data?.event.activityType && activityTypeLabels[data?.event.activityType]}</span>
                    {data?.event.myRole == "ORGANIZER" && <span className="tag">באחריותי</span>}
                </div>
                <h1>{data?.event.title}</h1>
                <div className="event-hero-desc">{data?.event.description}</div>
            </div>

            {data?.event.myRole == "ORGANIZER" ? <div className="event-hero-actions">
                <Link className="btn btn-light" to="edit">עריכת פרטים</Link>
                <button className="btn btn-outline-light" disabled={isDeleting} onClick={clearEvent}>{isDeleting ? <>מוחק...<Loading /></> : "מחיקת מפגש"}</button>
                {cannotDel && <div className="alert alert-error">{getApiError(notDel).message}</div>}
            </div> : <button className="btn btn-outline-light" disabled={isLeaving} onClick={leaveEvent}>{isLeaving ? <div>עוזב... <Loading /></div> : <div>עזיבת המפגש</div>}</button>}
                {connotLeave && <div className="alert alert-error">{getApiError(dontLeave).message}</div>}
            {/* details */}
            <div className="info-tiles">
                <div className="info-tile"><p className="info-tile-label">מתי</p><p className="info-tile-value">{data?.event.eventDate ? formatDate(data?.event.eventDate) : "עדיין לא נקבע תאריך"}</p></div>
                <div className="info-tile"><p className="info-tile-label">איפה</p><p className="info-tile-value">{data?.event.location ? data?.event.location : "עדיין לא נקבע מקום"}</p></div>
                <div className="info-tile"><p className="info-tile-label">מה אוכלים</p><p className="info-tile-value">{data?.event.food ? data?.event.food : "עדיין לא נקבע אוכל"}</p></div>
                <div className="info-tile"><p className="info-tile-label">תקציב</p><p className="info-tile-value">{data?.event.budget != null ? data?.event.budget + " ₪ " : "עדיין לא נקבע תקציב"}</p></div>
            </div>
            <nav className="tabs">
                <NavLink to="." end className="tab">משתתפים ותפקידים</NavLink>
                <NavLink to="survey" className="tab">סקר</NavLink>
                <NavLink to="expenses" className="tab">הוצאות והתחשבנות</NavLink>
                {data.event.myRole=="ORGANIZER"&&<NavLink to="participants" className="tab">ניהול משתתפים</NavLink>}
            </nav>
        </div>
        <Outlet />

    </>
}

export default EventPage