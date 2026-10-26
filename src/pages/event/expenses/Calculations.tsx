import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { calculate, getCalculating } from "../../../api/calculating"
import Loading from "../../../components/loading"
import getApiError from "../../../utils/getApiError"
import { formatDate } from "../../../utils/formatDate"
import { useContext } from "react"
import { CuserContext } from "../../../auth/cuserContext"
import { getEvent } from "../../../api/eventsApi"

const Calculations = () => {

    const { cuser } = useContext(CuserContext)
    const { eventId } = useParams()
    const id = Number(eventId)

    const { data, isError, error, isPending } = useQuery({
        queryKey: ["calculations", id],
        queryFn: () => getCalculating(id)
    })
    const { data: events } = useQuery({
        queryKey: ["event", id],
        queryFn: () => getEvent(id)
    })
    const queryClient = useQueryClient()
    const { mutate, isPending: pendingCalc, isError: isErrorCalc, error: errorCalc } = useMutation({
        mutationFn: calculate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["calculations", id] })
        }
    })
    if (isPending)
        return <Loading />
    if (isError)
        return <div className="alert alert-error settle-load-error">{getApiError(error).message}</div>

    return <div className="card card-dark settle-card">
        {data.calculated ? <>
            <div className="settle-body">
                <div className="settle-head">
                    <h3 className="settle-title">התחשבנות</h3>
                    <div className="settle-time">חושב {formatDate(data.calculatedAt||"")}</div>
                    {data.isOutdated && <div className="settle-outdated">החישוב לא עדכני, נעשו שינויים מהחישוב האחרון</div>}
                </div>
                <div className="settle-stats">
                    <div className="settle-stat">
                        <p className="settle-stat-label">כל אחד משלם</p>
                        <span className="settle-stat-value">{data.sharePerPerson} ₪</span>
                    </div>
                    <div className="settle-count-label">משתתפים</div>
                    <span className="settle-count">{data.participantsCount}</span>
                </div>
                <h4 className="settle-sub">מי מעביר למי</h4>
                <p className="settle-note">מוצגות רק ההעברות שקשורות אליך</p>

                <ul className="settle-list">
                    {data.myTransfers.toPay.map(t => <li className="settle-row settle-pay" key={t.id}>
                        <div className="settle-person">
                            <p className="settle-name">{cuser?.fullName}</p>
                            <p className="settle-phone">{cuser?.phone}</p>
                        </div>
                        <div className="settle-mid">
                            {/* icon */}
                            <span className="settle-arrow">{"<--"}</span>
                            <p className="settle-amount">{t.amount} ₪</p>
                        </div>
                        <div className="settle-person">
                            <p className="settle-name">{t.toUser.fullName}</p>
                            <p className="settle-phone">{t.toUser.phone}</p>
                        </div>
                    </li>)}

                    {data.myTransfers.toReceive.map(t => <li className="settle-row settle-receive" key={t.id}>
                        <div className="settle-person">
                            <p className="settle-name">{cuser?.fullName}</p>
                            <p className="settle-phone">{cuser?.phone}</p>

                        </div>
                        <div className="settle-mid">
                            {/* icon */}
                            <span className="settle-arrow">{"-->"}</span>
                            <p className="settle-amount">{t.amount} ₪</p>
                        </div>
                        <div className="settle-person">
                            <p className="settle-name">{t.fromUser.fullName}</p>
                            <p className="settle-phone">{t.fromUser.phone}</p>
                        </div>
                    </li>)}
                </ul>
               {data.myBalance!=null&& <div className="settle-balance">
                    המצב שלך:  {data.myBalance>0?`מגיע לך ${data.myBalance} ₪`:data.myBalance<0?`בחוב של ${Math.abs(data.myBalance)} ₪`:"אין חובות, איזה כיף!"}
                </div>}

            </div>
        </> : <>
            <div className="settle-empty">עדיין לא חושבה ההתחשבנות</div>
        </>}
        {events?.event.myRole == "ORGANIZER" && <button className="btn settle-btn" disabled={pendingCalc} onClick={() => mutate(id)}>{pendingCalc ? <>מחשב...<Loading /></> : data.calculated ? "חישוב מחדש" : "חישוב ההתחשבנות"}</button>}
        {isErrorCalc && <div className="alert alert-error settle-error">{getApiError(errorCalc).message}</div>}
    </div>

}


export default Calculations