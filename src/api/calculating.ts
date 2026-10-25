import type { AllCalculations } from "../models/expenses"
import api from "./generalAxios"

export const getCalculating=async(id:number)=>{
    const res=await api.get<AllCalculations>(`/events/${id}/settlement`)
    return res.data
}

export const calculate=async(id:number)=>{
    const res=await api.post<AllCalculations>(`/events/${id}/settlement/calculate`)
    return res.data
}