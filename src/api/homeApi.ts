import type HomeResponse from "../models/home"
import api from "./generalAxios"

export const getHomeDetails=async()=>{
    const res=await api.get<HomeResponse>("/home")
    return res.data
}