import type { EventStatus } from "../models/eventSelections"

export const realStatus=(status:EventStatus,date:Date|null):EventStatus=>{
    if(!date)
        return status
    if((status=="PLANNING"||status=="SCHEDULED")&&date<new Date())
        return "COMPLETED"
    return status
}