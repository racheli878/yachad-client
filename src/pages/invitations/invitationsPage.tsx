import { useQuery } from "@tanstack/react-query"
import { getMyInvitations } from "../../api/invitationsApi"
import InvitationCard from "./invitationCard"
import Loading from "../../components/loading"
import getApiError from "../../utils/getApiError"

const InvitationsPage = () => {

    const { data, isError, error, isPending } = useQuery({
        queryKey: ["invitations"],
        queryFn: () => getMyInvitations()
    })

    if(isPending)
        return <Loading/>
    if(isError)
        return <div className="alert alert-error invites-wrap">{getApiError(error).message}</div>
    return <>
        <div className="page-head invites-head">
            <h1>ההזמנות שלי</h1>
            <p className="page-title-sub">ההזמנות שנשלחו למייל או לטלפון שלך. אחרי אישור המפגש יופיע ב"כל האירועים"</p>
        </div>
        <ul className="invites">
        {data.invitations.map(i =><li key={i.id} className="invite-card"> <InvitationCard invitation={i} /></li> )}
        </ul>
        <div className="invites-empty">
            <p>אין הזמנות {data.count!=0&&"נוספות"}. כשמישהו יזמין אותך - ההזמנה תופיע כאן</p>
        </div>
    </>
}

export default InvitationsPage