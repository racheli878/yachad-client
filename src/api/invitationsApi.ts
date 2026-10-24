import type { confirmInvitation, Invitations } from "../models/invitation"
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