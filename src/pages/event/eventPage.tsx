import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
import { deleteEvent, leavingEvent } from "../../api/eventsApi"
import getApiError from "../../utils/getApiError"
import Loading from "../../components/loading"
import { formatDate } from "../../utils/formatDate"
import { activityTypeLabels, categoryLabels, EventStatusLabels } from "../../utils/labels"
import { useState } from "react"
import ConfirmModal from "../../components/confirmModal"
import useEvent from "../../utils/useEvent"
import PageError from "../../components/pageError"

const EventPage = () => {

    const { eventId } = useParams()
    const id = Number(eventId)
    const { data, isPending, isError, error } = useEvent(id)
    const [askDelete, setAskDelete] = useState(false)
    const [askLeave, setAskLeave] = useState(false)

    const clearEvent = () => {
        setAskDelete(true)
    }
    const leaveEvent = () => {
        setAskLeave(true)
    }
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate, isError: cannotDel, error: notDel, isPending: isDeleting } = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
            navigate("/allEvents")
        },
    })
    const { mutate: leaveMutate, isPending: isLeaving, isError: connotLeave, error: dontLeave } = useMutation({
        mutationFn: leavingEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
            navigate("/allEvents")
        },
    })

    if (isPending)
        return <Loading />

    if (isError)
        return <PageError error={error}/>

    return <>
        <div className="event-hero">
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
                {askDelete && <ConfirmModal onCancel={() => setAskDelete(false)} onConfirm={() => { mutate(id); setAskDelete(false) }}
                    confirmText="מחיקה" text="למחוק את המפגש? הוא יימחק לצמיתות אצל כל המשתתפים, כולל הסקר וההוצאות ללא אפשרות שחזור. ניתן לחילופין לשנות את הסטטוס ל'בוטל' במסך העריכה" title="מחיקת מפגש" />}
                {cannotDel && <div className="alert alert-error">{getApiError(notDel).message}</div>}
            </div> : <button className="btn btn-outline-light" disabled={isLeaving} onClick={leaveEvent}>{isLeaving ? <div>עוזב... <Loading /></div> : <div>עזיבת המפגש</div>}</button>}
            {askLeave && <ConfirmModal onCancel={() => setAskLeave(false)} onConfirm={() => { leaveMutate(id); setAskLeave(false) }} confirmText="עזיבה" text="בטוח שברצונכם לעזוב את המפגש?" title="עזיבת מפגש" />}
            {connotLeave && <div className="alert alert-error">{getApiError(dontLeave).message}</div>}
            {/* details */}
            <div className="info-tiles">
                <div className="info-tile"><p className="info-tile-label">מתי</p><p className="info-tile-value">
                    {data?.event.eventDate ? <>
                        <span className="info-tile-day">{formatDate(data.event.eventDate).split(" · ")[0]}</span>
                        <span className="info-tile-time">{formatDate(data.event.eventDate).split(" · ")[1]}</span>
                    </>
                        : "עדיין לא נקבע תאריך"}</p></div>
                <div className="info-tile"><p className="info-tile-label">איפה</p><p className="info-tile-value">{data?.event.location ? data?.event.location : "עדיין לא נקבע מקום"}</p></div>
                <div className="info-tile"><p className="info-tile-label">מה אוכלים</p><p className="info-tile-value">{data?.event.food ? data?.event.food : "עדיין לא נקבע אוכל"}</p></div>
                <div className="info-tile"><p className="info-tile-label">תקציב</p><p className="info-tile-value">{data?.event.budget != null ? data?.event.budget + " ₪ " : "עדיין לא נקבע תקציב"}</p></div>
            </div>
            <nav className="tabs">
                <NavLink to="." end className="tab">משתתפים ותפקידים</NavLink>
                <NavLink to="survey" className="tab">סקר</NavLink>
                <NavLink to="expenses" className="tab">הוצאות והתחשבנות</NavLink>
                {data.event.myRole == "ORGANIZER" && <NavLink to="participants" className="tab">ניהול משתתפים</NavLink>}
            </nav>
        </div>
        <Outlet />

    </>
}

export default EventPage