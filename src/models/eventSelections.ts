
export type EventStatus="PLANNING"|"SCHEDULED"| "COMPLETED"| "CANCELLED"

export type EventRole="ORGANIZER"|"PARTICIPANT" 

export const categories=["FAMILY", "FRIENDS", "CLASS_COMMUNITY", "WORK", "OTHER"] as const

export type EventCategory = typeof categories[number]

export const activityTypes=["BIRTHDAY","GATHERING", "MEAL","SPORT","TRIP", "REFRESHMENT", "HOLIDAY", "OTHER"] as const

export type ActivityType=typeof activityTypes[number]