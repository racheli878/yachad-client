import { type SurveyResults, type AnswersParticipant, type SurveyParticipant, type NewQuestion } from "../models/survey"
import api from "./generalAxios"

export const getMySurvey = async (id: number) => {
    const res = await api.get<SurveyParticipant>(`/events/${id}/survey`)
    return res.data
}

export const saveSurveyParticipant=async({id,data}:{id:number,data:AnswersParticipant})=>{
    const res=await api.put<SurveyParticipant>(`/events/${id}/survey/answers`,data)
    return res.data
}

export const getSurveyResults=async(id:number)=>{
    const res=await api.get<SurveyResults>(`/events/${id}/survey/results`)
    return res.data
}

export const InitQustions=async()=>{
    const res=await api.get<{ questions: NewQuestion[] }>(`/survey/default-questions`)
    return res.data
}