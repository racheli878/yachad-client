import { type AnswersParticipant, type SurveyParticipant } from "../models/survey"
import api from "./generalAxios"

export const getMySurvey = async (id: number) => {
    const res = await api.get<SurveyParticipant>(`/events/${id}/survey`)
    return res.data
}

export const saveSurveyParticipant=async({id,data}:{id:number,data:AnswersParticipant})=>{
    const res=await api.put<SurveyParticipant>(`/events/${id}/survey/answers`,data)
    return res.data
}