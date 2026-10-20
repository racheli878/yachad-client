import {type EventsResponse } from "../models/event";
import api from "./generalAxios";

const getAllEvents = async () => {
    const res = await api.get<EventsResponse>("/events")
    return res.data
}

export default getAllEvents