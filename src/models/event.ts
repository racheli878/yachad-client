import type { ActivityType, EventCategory, EventRole, EventStatus } from "./eventSelections";
import type { SkippedInvitee } from "./invitation";
import type { NewQuestion, QuestionField } from "./survey";
import type { Task } from "./tasks";

// מפגש אחד בתוך הרשימה
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

// רשימת האירועים
export interface EventsResponse{
    count:number,
    events:EventListItem[],

}

// פרטי מפגש מלאים
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
food:string|null,
budget:number|null,
organizer:{id:number,fullName:string,phone:string},
}

// המפגש שבתוך ההזמנה
export interface EventShortInvite{
    id:number,
    title:string,
    description:string|null,
    eventDate:string|null,
    location:string|null,
    category:EventCategory,
    activityType:ActivityType,
    status:EventStatus,
    budget:number|null,
    participantsCount:number,
    organizer:{id:number,fullName:string}
}

//טופס יצירת אירוע
export interface EventForm{
    title:string,
    description:string|null,
    eventDate:string|null,
    location:string|null,
    food:string|null,
    category:EventCategory,
    activityType:ActivityType,
    budget:number|null,
}

//שליחת עריכת אירוע
export interface EditEventForm extends EventForm{
    status:EventStatus
}

// בקשת יצירת אירוע
export interface NewEventRequest{
    title:string,
    description?:string|null,
    eventDate?:string|null,
    location?:string|null,
    food?:string|null,
    category?:EventCategory,
    activityType?:ActivityType,
    budget?:number|null,
    invitees:{contact:string}[],
    questions:NewQuestion[]
}

export interface NewEventForm extends EventForm, InviteesForm {
    questions: QuestionField[];
}


// משתתף מאושר במפגש
export interface Participant {
    userId: number,
    fullName: string,
    phone: string,
    role: EventRole,
    joinedAt: string
}



// דף מפגש: שלושה חלקים זה לצד זה
export interface EventPageResponse {
    event: EventDetails,
    participants: Participant[],
    tasks: Task[]
}


// התשובה ליצירת מפגש: כל דף המפגש, ועוד סיכום ההזמנות
export interface CreateEventResponse extends EventPageResponse {
    invitationsSummary: {
        createdCount: number,
        skippedCount: number,
        skipped: SkippedInvitee[]
    },
    questionsCount: number
}

export type UpdateEventRequest = Partial<Omit<NewEventRequest, "invitees" | "questions"> & { status: EventStatus }>


export interface InviteesForm {
    invitees: { contact: string }[];
}
