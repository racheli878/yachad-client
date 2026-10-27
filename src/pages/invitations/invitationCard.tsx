import type Invitation from "../../models/invitation"
import { activityTypeLabels, categoryLabels, EventStatusLabels } from "../../utils/labels"
import { cancelInvitations, confirmInvitationApi } from "../../api/invitationsApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import getApiError from "../../utils/getApiError"
import Loading from "../../components/loading"
import { useNavigate } from "react-router-dom"

const InvitationCard = ({ invitation }: { invitation: Invitation }) => {
    const queryClient = useQueryClient()
    const nvaigate = useNavigate()

    const { mutate, isPending,isError,error } = useMutation({
        mutationFn: confirmInvitationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
            queryClient.invalidateQueries({ queryKey: ["invitations"] })
            nvaigate(`/event/${invitation.event.id}`)
        },
    })

    const { mutate: declineInvitation, isPending: isDeslining,isError:connotCancel, error:errorCancel } = useMutation({
        mutationFn: cancelInvitations,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
            queryClient.invalidateQueries({ queryKey: ["invitations"] })

        },
    })
    let month, day, time;
    if (invitation.event.eventDate) {
        const date = new Date(invitation.event.eventDate);

        month = new Intl.DateTimeFormat("he-IL", {
            month: "long",
            timeZone: "Asia/Jerusalem"
        }).format(date);

        day = new Intl.DateTimeFormat("he-IL", {
            day: "numeric",
            timeZone: "Asia/Jerusalem"
        }).format(date);

        time = new Intl.DateTimeFormat("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
            timeZone: "Asia/Jerusalem"
        }).format(date);
    }


    return <>
        <div className="invite-stub">

            {invitation.event.eventDate ? <div className="invite-date">
                <div className="invite-date-small">{month}</div>
                <div className="invite-date-day">{day}</div>
                <div className="invite-date-small">{time}</div>
            </div>
                : "עדיין לא נקבע תאריך"}
        </div>
        <div className="invite-body">
            <div className="invite-tags">
                <span className="tag invite-tag">{activityTypeLabels[invitation.event.activityType]} · {categoryLabels[invitation.event.category]}</span>
                <span className="tag tag-pending invite-tag">{EventStatusLabels[invitation.event.status]}</span>
            </div>
            <h2 className="invite-title">{invitation.event.title}</h2>
            <p className="invite-from">הוזמנת ע"י {invitation.invitedBy.fullName} · {invitation.event.participantsCount} כבר אשרו</p>
            <div className="invite-meta invite-place">{invitation.event.location ? invitation.event.location : "עדיין לא נקבע מקום"}</div>
            <div className="invite-meta invite-budget">תקציב:  {invitation.event.budget != null ? invitation.event.budget + "₪" : "עדיין לא נקבע תקציב"}</div>
            <button className="btn btn-primary" disabled={isPending} onClick={() => mutate(invitation.id)}>{isPending ? <><div>טוען...</div><Loading /></> : "רוצה להשתתף"}</button>
            {isError&&<div>{getApiError(error).message}</div>}
            <button className="btn btn-ghost" disabled={isDeslining} onClick={() => declineInvitation(invitation.id)}>{isDeslining ? <><div>טוען...</div><Loading /></> : "לא הפעם"}</button>
            {connotCancel&& <div className="alert alert-error invite-error">{getApiError(errorCancel).message}</div>}
        </div>
    </>
}

export default InvitationCard