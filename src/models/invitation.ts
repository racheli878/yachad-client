
export type InvitationStatus="DECLINED"|"ACCEPTED"|"PENDING"

export default interface Invitation{

}

export interface InvitationSummary {
    eventId: number,
    invitationSent: number,
    skippedMessages: string[]
}