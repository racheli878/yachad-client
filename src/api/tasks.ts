import type { Task } from "../models/tasks"
import api from "./generalAxios"


export const createTask=async({eventId,description}:{eventId:number,description:string})=>{
    const res=await api.post<Task>(`/events/${eventId}/tasks`,{description})
    return res.data
}

export const editTask=async({eventId,taskId,data}:{eventId:number,taskId:number,data:{description:string}})=>{
    const res=await api.put(`/events/${eventId}/tasks/${taskId}`,data)
    return res.data
}

export const releaseTask=async({eventId,taskId}:{eventId:number,taskId:number})=>{
    const res=await api.post<Task>(`/events/${eventId}/tasks/${taskId}/release`)
    return res.data
}

export const takeTask=async({eventId,taskId}:{eventId:number,taskId:number})=>{
    const res=await api.post<Task>(`/events/${eventId}/tasks/${taskId}/claim`)
    return res.data
}

export const deleteTask=async({eventId,taskId}:{eventId:number,taskId:number})=>{
    const res=await api.delete<{message:string}>(`/events/${eventId}/tasks/${taskId}`)
    return res.data
}