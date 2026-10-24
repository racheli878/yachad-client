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
    <div>
        {invitation.event.eventDate?formatDate(invitation.event.eventDate):"עדיין לא נקבע תאריך"} 
    </div>
    <div>
        <div>
            <span>{activityTypeLabels[invitation.event.activityType]} · {categoryLabels[invitation.event.category]}</span>
            <span>{EventStatusLabels[invitation.event.status]}</span>
        </div>
        <h2>{invitation.event.title}</h2>
        <p>הוזמנת ע"י {invitation.invitedBy.fullName} · {invitation.event.participantsCount} כבר אשרו</p>
        <div>{invitation.event.location?invitation.event.location:"עדיין לא נקבע מקום"}</div>
        <div>תקציב {invitation.event.budget!=null?invitation.event.budget+ "₪":"עדיין לא נקבע תקציב"}</div>
        <button disabled={isPending} onClick={()=>mutate(invitation.id)}>{isPending?<><div>טוען...</div><Loading/></>:"רוצה להשתתף"}</button>
        <button disabled={isDeslining} onClick={()=>declineInvitation(invitation.id)}>{isDeslining?<><div>טוען...</div><Loading/></>:"לא הפעם"}</button>
        {err!=""&&<div>{err}</div>}
    </div>
    </>
}

export default InvitationCard