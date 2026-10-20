import type { ActivityType, EventCategory, EventRole, EventStatus } from "./eventSelections";

export default interface EventListItem{
id:number,
title:string,  
description:string|null,
category:EventCategory,
activityType:ActivityType,
status:EventStatus,
eventDate:string|null,
location:string|null,
myRole:EventRole,
participantsCount:number,
organizer:{id:number,fullName:string},

}


export interface EventsResponse{
    count:number,
    events:EventListItem[],

}

export interface EventDetails{
id:number,
title:string,
description:string|null,
category:EventCategory,
activityType:ActivityType,
eventDate:string|null,
status:EventStatus,
location:string|null,
myRole:EventRole,
food:string,
budjet:number,
organizer:{id:number,fullName:string,phone:string},
participants:{userId:number,fullName:string,phone:string,role:EventRole}[],
tasks:{id:number,description:string,isTaken:boolean,assignee:{id:number,fullName:string},isMine:boolean}[],
}

export interface EventShortInvite{
    id:number,
    title:string,
    description:string|null,
    eventDate:string|null,
    location:string|null,
    category:EventCategory,
    activityType:ActivityType,
    status:EventStatus,
    budjet:number,
    participantsCount:number,
    organizer:{id:number,fullName:string}
}
