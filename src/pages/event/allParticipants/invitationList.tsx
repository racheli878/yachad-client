import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getInvitationsDetails } from "../../../api/invitationsApi"
import Loading from "../../../components/loading"
import getApiError from "../../../utils/getApiError"
import { InvitationStatusLabels } from "../../../utils/labels"
import { formatDate } from "../../../utils/formatDate"

const InvitationList = () => {

    const { eventId } = useParams()
    const id = Number(eventId)
    const { data, isError, error, isPending } = useQuery({
        queryKey: ["invitations", id],
        queryFn: () => getInvitationsDetails(id)
    })
    if (isPending)
        return <Loading />
    if (isError)
        return <div className="alert alert-error">{getApiError(error).message}</div>

    return <div className="card parts-invites">
        <div className="parts-invites-head">
            <h3 className="parts-invites-title">הזמנות שנשלחו</h3>
            <div className="parts-counts">
                <span className="tag tag-accepted">{data.acceptedCount} אושרו</span>
                <span className="tag tag-pending">{data.pendingCount} בהמתנה</span>
                <span className="tag tag-declined">{data.declinedCount} נדחו</span>
            </div>
        </div>
        <table className="table parts-table">
            <thead>
                <tr>
                <th>מוזמן</th>
                <th>רשום באתר?</th>
                <th>סטטוס</th>
                <th>נשלחה</th>
                </tr>
            </thead>
            <tbody>
                {data.invitations.map(i=><tr key={i.id}>
                    <td className="parts-contact">{i.email?i.email:i.phone}</td>
                    <td className="parts-muted">{i.registeredUser?<span>כן - {i.registeredUser.fullName}</span>:"עדיין לא"}</td>
                    <td className={`parts-status parts-status-${i.status.toLowerCase()}`}>{InvitationStatusLabels[i.status]}</td>
                    <td className="parts-muted">{formatDate(i.createdAt)}</td>
                </tr>)}
            </tbody>
        </table>

    </div>
}

export default InvitationList