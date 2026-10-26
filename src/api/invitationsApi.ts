import type { AddInvitationsResponse, confirmInvitation, InvitationDetails, Invitations } from "../models/invitation"
import api from "./generalAxios"

export const getMyInvitations=async()=>{
    const res=await api.get<Invitations>("/invitations/me")
    return res.data
}

export const confirmInvitationApi=async(id:number)=>{
    const res=await api.post<confirmInvitation>(`/invitations/${id}/accept`)
    return res.data
}

export const cancelInvitations=async(id:number)=>{
    const res=await api.post<confirmInvitation>(`/invitations/${id}/decline`)
    return res.data
}

export const getInvitationsDetails=async(id:number)=>{
    const res=await api.get<InvitationDetails>(`/events/${id}/invitations`)
    return res.data
}

export const addInvitation=async({id,invitees}:{id:number,invitees:{ contact: string; }[]})=>{
    const res=await api.post<AddInvitationsResponse>(`/events/${id}/invitations`,{invitees})
    return res.data
}