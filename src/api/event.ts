import api from "./generalAxios"


export const editTask=async({eventId,taskId,data}:{eventId:number,taskId:number,data:{description:string}})=>{
    const res=await api.put(`/events/${eventId}/tasks/${taskId}`,data)
    return res.data
}