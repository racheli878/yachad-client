import {type Expense, type Expenses, type LittleExpense } from "../models/expenses"
import api from "./generalAxios"

export const getExpenses=async(id:number)=>{
    const res=await api.get<Expenses>(`/events/${id}/expenses`)
    return res.data
}

export const addExpense=async({id,data}:{id:number,data:{amount:number,reason:string}})=>{
    const res=await api.post<{expense:Expense}>(`/events/${id}/expenses`,data)
    return res.data
}

export const editExpense=async({eventId,expenseId,data}:{eventId:number,expenseId:number,data:LittleExpense})=>{
    const res=await api.put<{expense:Expense}>(`/events/${eventId}/expenses/${expenseId}`,data)
    return res.data
}

export const deleteExpense=async({eventId,expenseId}:{eventId:number,expenseId:number})=>{
    const res=await api.delete<{message:string}>(`/events/${eventId}/expenses/${expenseId}`)
    return res.data
}