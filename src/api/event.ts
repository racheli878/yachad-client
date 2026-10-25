import type  TasksList from "../models/tasks"
import api from "./generalAxios"


export const getTasksForEvent=async(id:number)=>{
    const res=await api.get<TasksList>(`/events/${id}/tasks`)
    return res.data
}

export const editTask=async({eventId,taskId,data}:{eventId:number,taskId:number,data:{description:string}})=>{
    const res=await api.put(`/events/${eventId}/tasks/${taskId}`,data)
    return res.data
}