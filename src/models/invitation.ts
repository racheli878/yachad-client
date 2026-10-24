import type { EventShortInvite } from "./event"

export type InvitationStatus="DECLINED"|"ACCEPTED"|"PENDING"

export default interface Invitation{
    id:number,
    invitedBy:{id:number,fullName:string}
    event:EventShortInvite
}

export interface Invitations{
    count:number,
    invitations:Invitation[]
}

export interface InvitationSummary {
    eventId: number,
    invitationSent: number,
    skippedMessages: string[]
}

export interface confirmInvitation{
    message:string,
    eventId:number
}

// מוזמן שלא קיבל הזמנה, והסיבה
export interface SkippedInvitee {
    email: string | null,
    phone: string | null,
    reason: "DUPLICATE_IN_LIST" | "ALREADY_PARTICIPANT" | "ALREADY_INVITED",
    message: string
}