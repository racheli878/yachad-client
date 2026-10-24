import { useState } from "react"
import type Invitation from "../../models/invitation"
import { activityTypeLabels, categoryLabels, EventStatusLabels } from "../../utils/labels"
import { cancelInvitations, confirmInvitationApi } from "../../api/invitationsApi"
import {Link, Navigate} from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import getApiError from "../../utils/getApiError"
import { formatDate } from "../../utils/formatDate"
import Loading from "../../components/loading"

const InvitationCard=({invitation}:{invitation:Invitation})=>{
    const [err,setErr]=useState("")
    const queryClient = useQueryClient()

 const { mutate, isPending } = useMutation({
        mutationFn: confirmInvitationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
            queryClient.invalidateQueries({ queryKey: ["invitations"] })
        },
        onError: (error) => {
           setErr(getApiError(error).message)
        }
    })


 const { mutate:declineInvitation, isPending:isDeslining } = useMutation({
        mutationFn: cancelInvitations,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
        },
        onError: (error) => {
           setErr(getApiError(error).message)
        }
    })


    return<>
    <div className="invite-stub">
        {invitation.event.eventDate?formatDate(invitation.event.eventDate):"עדיין לא נקבע תאריך"} 
    </div>
    <div className="invite-body">
        <div className="invite-tags">
            <span className="tag invite-tag">{activityTypeLabels[invitation.event.activityType]} · {categoryLabels[invitation.event.category]}</span>
            <span className="tag tag-pending invite-tag">{EventStatusLabels[invitation.event.status]}</span>
        </div>
        <h2 className="invite-title">{invitation.event.title}</h2>
        <p className="invite-from">הוזמנת ע"י {invitation.invitedBy.fullName} · {invitation.event.participantsCount} כבר אשרו</p>
        <div className="invite-meta invite-place">{invitation.event.location?invitation.event.location:"עדיין לא נקבע מקום"}</div>
        <div className="invite-meta invite-budget">תקציב {invitation.event.budget!=null?invitation.event.budget+ "₪":"עדיין לא נקבע תקציב"}</div>
        <button className="btn btn-primary" disabled={isPending} onClick={()=>mutate(invitation.id)}>{isPending?<><div>טוען...</div><Loading/></>:"רוצה להשתתף"}</button>
        <button className="btn btn-ghost" disabled={isDeslining} onClick={()=>declineInvitation(invitation.id)}>{isDeslining?<><div>טוען...</div><Loading/></>:"לא הפעם"}</button>
        {err!=""&&<div className="alert alert-error invite-error">{err}</div>}
    </div>
    </>
}

export default InvitationCard