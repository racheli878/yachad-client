import { type EventsResponse } from "../models/event";
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