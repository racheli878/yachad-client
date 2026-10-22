import { type CreateEventResponse, type EventDetails, type EventPageResponse, type EventsResponse, type NewEventRequest } from "../models/event";
import type { UpdateEventRequest } from "../models/event";
import api from "./generalAxios";

const getAllEvents = async (search: string, isMyOrganize: boolean) => {
    const params = new URLSearchParams()
    if (search != "")
        params.append("search", search)
    if(isMyOrganize)
        params.append("myRole","ORGANIZER")
    const res = await api.get<EventsResponse>("/events",{params:params})
    return res.data
}

export default getAllEvents

export const createEvent=async(event:NewEventRequest)=>{
    const res=await api.post<CreateEventResponse>("/events",event)
    return res.data
}

export const getEvent=async(id:number)=>{
    const res=await api.get<EventPageResponse>(`/events/${id}`)
    return res.data
}

export const deleteEvent=async(id:number)=>{
    const res=await api.delete(`/events/${id}`)
    return res.data
}

export const leavingEvent=async(id:number)=>{
    const res=await api.post(`/events/${id}/leave`)
    return res.data
}

export const updateEvent=async({id,data}:{id:number,data:UpdateEventRequest})=>{
    const res=await api.put<{event:EventDetails}>(`/events/${id}`,data)
    return res.data
}