import { useQuery } from "@tanstack/react-query"
import { getHomeDetails } from "../api/homeApi"
import Loading from "../components/loading"
import getApiError from "../utils/getApiError"
import { formatDay, formatDayDate, formatMonth } from "../utils/formatDate"
import { Link } from "react-router-dom"
import { EventRoleLabels } from "../utils/labels"

const HomePage = () => {
    const { data, isError, error, isPending } = useQuery({
        queryKey: ["home"],
        queryFn: getHomeDetails
    })
    if (isPending)
        return <Loading />
    if (isError)
        return <div className="page-error">{getApiError(error).message}</div>

    return <div className="container page home-page">
        <div className="home-head">
            <p className="home-date">{formatDayDate(String(new Date()))}</p>
            <h1 className="home-title">שלום, {data.user.fullName}</h1>
        </div>
        <div className="home-stats">
            <div className="home-stat home-stat-invites">
                <p className="home-stat-label">הזמנות ממתינות</p>
                <span className="home-stat-num">{data.pendingInvitationsCount}</span>
                <Link className="home-stat-link" to="/invitations">לאישור או דחיה </Link>
            </div>
            <div className="home-stat">
                <p className="home-stat-label">התפקידים שלי</p>
                <span className="home-stat-num">{data.myOpenTasks.length}</span>
                <p className="home-stat-sub">במפגשים פעילים</p>
            </div>
            <div className="home-stat home-stat-money">
                <p className="home-stat-label">מגיע לי</p>
                <span className="home-stat-num">{data.money.totalToReceive.toFixed(2)} ₪</span>
                <p className="home-stat-sub">מ {data.money.toReceive.length} העברות · לשלם: {data.money.totalToPay.toFixed(2)} ₪</p>
            </div>
        </div>

        <div className="card home-events">
            <div className="home-events-head">
                <h2 className="home-events-title">המפגשים הקרובים</h2>
                <Link className="home-events-all" to="/allEvents">לכל המפגשים</Link>
            </div>
            {data.upcomingEvents.length>0?data.upcomingEvents.map(e=><Link to={`/event/${e.id}`} className="home-event" key={e.id}>
                <span className={e.eventDate ? "date-box" : "date-box empty"}>{e.eventDate?<><span className="date-box-day">{formatDay(e.eventDate)}</span><span className="date-box-month">{formatMonth(e.eventDate)}</span></>:"טרם נקבע"}</span>
                <div className="home-event-text">
                    <h3 className="home-event-title">{e.title}</h3>
                    <p className="home-event-place">{e.location?e.location:"טרם נקבע מקום"}</p>
                </div>
                <span className={`tag tag-${e.myRole.toLowerCase()}`}>{EventRoleLabels[e.myRole]}</span>
            </Link>):<div className="home-empty"><p className="home-empty-text">עדיין אין מפגשים</p><Link className="btn btn-primary home-empty-btn" to="/addEvent">לחצו ליצירת המפגש הראשון</Link></div>}
        </div>

    </div>
}

export default HomePage